import { EventEmitter } from "events";
import { DocumentInstance, Document } from "../../mongo/document";
import { Filter } from "./filters";
import FilterService from "../../mongo/services/filters";
import { ValidationScheme } from "../../mongo/validation";
import WebsiteDataExtractor from "../phantom/WebsiteDataExtractor";

export interface Settings {
	enabled: boolean
	interval: number // seconds
}

export interface FilterChange {
	filter: Filter
	text: string | null
	changed: number | null // time when the filter was lastly spotted to change
}

interface FilterChangeMapping {
	[key: string]: FilterChange
}

export const SettingsScheme: ValidationScheme = {
	enabled: 'boolean',
	interval: 'number'
}

export default class FilterChangeTracker {

	private filters: Document<Filter>[] = []
	private timer: NodeJS.Timer | null = null
	private changes: FilterChangeMapping = {}
	private settings: Settings = {
		enabled: true,
		interval: 10
	}

	constructor(
		private readonly events: EventEmitter,
		private readonly filterService: FilterService
	) {
		events.on("filter-added", (filter: DocumentInstance<Filter>) => {
			if (filter.track) this.addFilter(filter)
		})
		events.on("filter-removed", (filter: DocumentInstance<Filter>) => {
			if (filter.track) this.removeFilter(filter)
		})
		events.on("filter-changed", (filter: DocumentInstance<Filter>) => {
			if (filter.track)
				this.addFilter(filter)
			else
				this.removeFilter(filter)
		})
	}

	getChange(filterId: string): FilterChange | null
	getChange(predicate: (filter: Document<Filter>) => boolean): FilterChange | null
	getChange(sth: string | ((this: void, filter: Document<Filter>, index: number) => boolean)) {
		if (typeof sth === "string")
			return this.changes[sth] || null
		const filter = this.filters.find(sth)
		if (filter)
			return this.changes[filter._id] || null
		return null
	}

	async init() {
		const fs = await this.filterService.findAll({
			track: true
		})
		fs.forEach(f => {
			if (f.track)
				this.addFilter(f)
		})
		if (this.settings.enabled)
			this.onEnabled()
	}

	contains(filterId: string) {
		return this.filters.findIndex(f => f._id === filterId) >= 0
	}

	private removeFilter(fltr: Document<Filter>) {
		const index = this.filters.findIndex(f => f._id === fltr._id)
		if (index < 0)
			return
		const filter = this.filters.splice(index, 1)[0]
		delete this.changes[filter._id]
		console.log("no longer tracking filter", filter.title)
	}

	private addFilter(filter: Document<Filter>) {
		if (this.contains(filter._id))
			return
		this.filters.push(filter)
		console.log("tracking filter", filter.title)
	}

	getSettings() {
		return { ...this.settings }
	}

	changeSettings(settings: Partial<Settings>) {
		Object.keys(this.settings).forEach(key => {
			const oldValue = this.settings[key]
			const newValue = settings[key]
			if (oldValue == newValue)
				return
			this.settings[key] = newValue
			this.settingUpdated(key, oldValue, newValue)
		})
	}

	private settingUpdated(key, oldValue, newValue) {
		if (key === "enabled")
			(newValue ? this.onEnabled : this.onDisabled).apply(this)
	}

	private onEnabled() {
		this.onTick()
	}

	private onDisabled() {
		if (this.timer)
			clearTimeout(this.timer)
	}

	private async onTick() {
		this.timer = null
		try {
			await this.doWork()
		} catch (ex) { }
		if (this.settings.enabled) // re-check
			this.timer = setTimeout(this.onTick.bind(this), this.settings.interval * 1000);
	}

	private async doWork() {
		console.log("tracking changes for " + this.filters.length + " filter(s)")
		const wde = new WebsiteDataExtractor()
		const filters = this.filters.slice()
		for (const filter of filters) {
			if (!this.contains(filter._id))
				continue // removed in the meantime
			try {
				await wde.changeFilter(filter)
				let text: string | null = null
				try {
					await wde.load()
					const data = await wde.getData()
					text = data && data.text || null
				} catch (ex) { }
				this.processDataChange(filter, text)
				await wde.close()
			} catch (ex) {
				console.error("An error occurred while trying to process tracked filters.", ex)
			}
		}
		wde.exit()
	}

	private processDataChange(filter: Document<Filter>, text: string | null) {
		if (!(filter._id in this.changes)) {
			this.changes[filter._id] = {
				changed: null,
				filter,
				text
			}
		} else {
			const change = this.changes[filter._id]
			if (change.text !== text) {
				change.changed = Date.now()
				change.text = text
			}
		}
	}

}
