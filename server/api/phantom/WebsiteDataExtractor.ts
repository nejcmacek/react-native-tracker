import * as path from "path"
import * as uuid from "uuid/v4"
import * as phantom from "phantom"
import endpoints from "../rest/endpoints"
import config from "../../util/config"
import { Filter } from "../filters/filters";
import { PhantomJS, WebPage } from "phantom";

declare var document: any

interface WebsiteData {
	text: string
	rect: Rect
}

interface Rect {
	left: number
	top: number
	width: number
	height: number
}

function sleep(timeout: number) {
	return new Promise(resolve =>
		setTimeout(resolve, timeout)
	)
}

export default class WebsiteDataExtractor {

	private instance: PhantomJS | null
	private page: WebPage | null
	private filter: Filter | null = null

	static defaultWidth = 1024
	static defaultHeight = 768
	static defaultFileDir = "./static/screenshots/"
	static defaultFilleUrl = "/static/screenshots/"

	constructor(filter?: Filter) {
		this.filter = filter || null
	}

	private getUrl() {
		const { filter } = this
		if (!filter)
			throw new Error("No filter given.")
		if (filter.method.toLowerCase() === "get")
			return filter.uri

		let url = config.app.url
			+ endpoints.util
			+ `?action=postRedirection&method=${filter.method}&uri=${encodeURIComponent(filter.uri)}`

		if (filter.body)
			for (const key in filter.body) {
				const value = filter.body[key]
				url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			}
		console.log(url)

		return url
	}

	getFilter = () => this.filter
	isPageOpened = () => !!this.page
	isRunning = () => !!this.instance

	async changeFilter(filter: Filter) {
		if (this.page)
			throw new Error("No pages can be opened when changing filter")
		this.filter = filter
	}

	async	load() {
		if (!this.filter)
			throw new Error("No filter given.")
		if (!this.instance)
			this.instance = await phantom.create()
		if (this.page)
			throw new Error("Page already open")
		this.page = await this.instance.createPage()
		this.page.property("viewportSize", {
			height: WebsiteDataExtractor.defaultHeight,
			width: WebsiteDataExtractor.defaultWidth
		})
		const url = this.getUrl()
		await this.page.open(url)
	}

	async getData(): Promise<WebsiteData | null> {
		if (!this.filter)
			throw new Error("No filter given.")
		if (!this.page)
			throw new Error("Page not loaded.")
		if (!this.filter.path)
			return null

		// if (this.filter.method.toLowerCase() === "post") {
		// 	this.page.
		// }

		const isContentLoaded = () => {
			if (!this.page) throw new Error()
			return this.page.evaluate(function (): string {
				return document.readyState
			})
		}

		for (let i = 0; i < 100; i++) {
			const res = await isContentLoaded()
			if (res === "complete")
				break
			else
				await sleep(10)
		}

		const data = await this.page.evaluate(function (path): WebsiteData | null {
			var elts = path.split(/>/g);
			var element = document.body;

			for (var i = 1; i < elts.length; i++) {
				element = element.children.item(elts[i]);
				if (!element) return null;
			}

			if (!element)
				return null;

			var rect = element.getBoundingClientRect();
			return {
				text: element.innerText,
				rect: {
					left: rect.left,
					top: rect.top,
					height: rect.height,
					width: rect.width
				}
			};
		}, this.filter.path)
		return data || null
	}

	private static modifyClippingRect(rect?: Rect): Rect {
		if (!rect)
			rect = {
				height: WebsiteDataExtractor.defaultHeight,
				width: WebsiteDataExtractor.defaultWidth,
				top: 0,
				left: 0
			}
		let { width, height, top, left } = rect
		width += 40
		if (width > WebsiteDataExtractor.defaultWidth)
			width = WebsiteDataExtractor.defaultHeight
		if (width < 200)
			width = 512
		height = width / 4 * 3
		top -= 20
		left -= 20
		if (left < 0)
			left = 0
		if (top < 0)
			top = 0
		return {
			left: left,
			top: top,
			height: height,
			width: width
		}
	}

	async	render(rect?: Rect, file?: string): Promise<string> {
		if (!this.page)
			throw new Error("Page not loaded.")
		this.page.property("clipRect", WebsiteDataExtractor.modifyClippingRect(rect))
		if (file === undefined)
			file = `${WebsiteDataExtractor.defaultFileDir}${uuid()}.png`
		console.log(file)
		await this.page.render(file, {
			format: "png",
			quality: "-1"
		})
		return file
	}

	renderBase64(rect: Rect): Promise<string> {
		if (!this.page)
			throw new Error("Page not loaded.")
		this.page.property("clipRect", WebsiteDataExtractor.modifyClippingRect(rect))
		return this.page.renderBase64("png")
	}

	async close() {
		if (this.page)
			await this.page.close()
		this.page = null
	}

	async exit() {
		if (this.page)
			await this.page.close()
		if (this.instance)
			this.instance.exit()
		this.page = null
		this.instance = null
	}




}