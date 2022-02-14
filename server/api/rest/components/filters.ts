import * as  path from "path"
import { Filter } from "../../filters/filters";
import { Request } from "express"
import { ApplicationContext } from "../../../index";
import RestService from "../index";
import endpoints from "../endpoints";
import IdentityProvider from "../../auth/identity";
import RestServiceComponent, { BindCallback } from "../component";
import WebsiteDataExtractor from "../../phantom/WebsiteDataExtractor";


interface FilterTitle {
	title: string
}

interface FilterChangeData {
	date: number | null
	text: string | null
}

export default class FilterRestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.bind({
			path: endpoints.filters
		}, this.onCall)
	}

	onCall: BindCallback = async (req, res, next) => {
		const action = req.query && req.query.action
		switch (action) {
			case "get":
				return await this.onGet(req, res, next)
			case "getAll":
				return await this.onGetAll(req, res, next)
			case "add":
				return await this.onAdd(req, res, next)
			case "remove":
				return await this.onRemove(req, res, next)
			case "removeAll":
				return await this.onRemoveAll(req, res, next)
			case "changeTracking":
				return await this.onChangeTracking(req, res, next)
			case "getChange":
				return await this.onGetChange(req, res, next)
			case "getScreenshot":
				return await this.onGetScreenshot(req, res, next)
			case "getText":
				return await this.onGetText(req, res, next)
			case "getWebData":
				return await this.onGetWebData(req, res, next)
			default:
				throw new Error("Unknown action.")
		}
	}

	onGet: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const showIds = !!req.query.showIds && identity.user.admin
		const filters = await mongo.filters.byUser(identity.user._id)
		const f = showIds
			? filters
			: filters.map(t => t.trimId())
		return f
	}

	onGetAll: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAdmin(req)
		const showIds = !!req.query.showIds && identity.user.admin
		const filters = await mongo.filters.findAll()
		const f = showIds
			? filters
			: filters.map(t => t.trimId())
		return f
	}

	onAdd: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const filter: Filter = { ...req.body, userId: identity.user._id }
		mongo.filters.validator.validate(filter)
		if (await mongo.filters.exists({
			title: filter.title
		}))
			throw new Error("Filter with such title already exists.")
		mongo.filters.insert(filter)
	}

	onRemove: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const ft = req.body as FilterTitle
		if (!ft.title)
			throw new Error("Title must be present.")
		mongo.filters.remove({
			userId: identity.user._id,
			title: ft.title
		})
	}

	onRemoveAll: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		mongo.filters.delteAllFromUser(identity.user._id)
	}

	onChangeTracking: BindCallback = async (req, res, next) => {
		const { idp, mongo, fct } = this.context
		const identity = idp.requireAuthentication(req)
		const title = this.getTitle(req)
		const track = req.body && req.body.track
		if (typeof track !== "boolean")
			throw new Error("Paramter 'track' must be given as a boolean.")
		await mongo.filters.update({
			userId: identity.user._id,
			title
		}, { track })
	}

	onGetChange: BindCallback = async (req, res, next): Promise<FilterChangeData | null> => {
		const { idp, mongo, fct } = this.context
		const identity = idp.requireAuthentication(req)
		const title = this.getTitle(req)
		const change = fct.getChange(f => f.userId === identity.user._id && f.title === title)
		if (!change)
			return null
		return {
			text: change.text,
			date: change.changed
		}
	}

	onGetScreenshot: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const title = req.body && req.body.title
		const filter = await this.getFilter(title, identity.user._id)
		const wde = new WebsiteDataExtractor(filter)
		await wde.load()
		const data = await wde.getData()
		const file = await wde.render(data && data.rect || undefined)
		await wde.exit()
		res.setHeader("Content-Type", "image/png")
		res.sendfile(file)
		return this.noReturnSymbol
	}

	onGetText: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const title = req.body && req.body.title
		const filter = await this.getFilter(title, identity.user._id)
		const wde = new WebsiteDataExtractor(filter)
		await wde.load()
		const data = await wde.getData()
		await wde.exit()
		if (!data || typeof data.text !== "string")
			return null
		return data.text
	}

	onGetWebData: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAuthentication(req)
		const title = req.body && req.body.title
		const filter = await this.getFilter(title, identity.user._id)
		const wde = new WebsiteDataExtractor(filter)
		await wde.load()
		const data = await wde.getData()
		const file = await wde.render(data && data.rect || undefined)
		await wde.exit()
		return {
			text: data && data.text || null,
			screenshotUrl: file.substr(1)
		}
	}

	private async getFilter(title: string, userId: string) {
		const { mongo } = this.context
		if (!title)
			throw new Error("Title must be given.")
		if (typeof title !== "string") // just-in-case
			throw new Error("Title must be a string.")
		if (typeof userId !== "string")
			throw new Error("User ID must be a string.")
		const filter = await mongo.filters.find({
			userId,
			title
		})
		if (!filter)
			throw new Error("Fitler does not exist.")
		return filter
	}

	private getTitle(req: Request): string {
		const title = req.body && req.body.title
		if (!title) throw new Error("Title must be given.")
		if (typeof title !== "string") throw new Error("Title must be a string.")
		return title
	}

}
