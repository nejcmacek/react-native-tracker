import { ApplicationContext } from "../../index";
import { Request, Response, NextFunction } from "express"
import RestService from "./index";

export interface BindOptions {
	path: string | RegExp
	verb?: string
	noReturnData?: boolean
}

export type BindCallback = (req: Request, res: Response, next: NextFunction) => Promise<any>

export interface RestServiceComponentConstructor {
	new (context: ApplicationContext, restService: RestService): RestServiceComponent
}

export default class RestServiceComponent {

	protected noReturnSymbol = Symbol("noReturn")

	constructor(
		public readonly context: ApplicationContext
	) { }

	bind(options: BindOptions, cb: BindCallback) {
		let { verb, path, noReturnData } = options
		verb = verb && verb.toLowerCase() || "post"
		path = path
		if (!path)
			throw new Error("Path must be given")
		const sb = (this.context.app as any)[verb]
		if (typeof sb !== "function")
			throw new Error("Unsupported verb.")
		sb.call(this.context.app, path, async (req, res, next) => {
			console.log("Incomming connection", req.originalUrl, req.body)
			try {
				const data = await cb(req, res, next)
				if (!(noReturnData || data === this.noReturnSymbol)) {
					if (data === undefined)
						res.send({ ok: true })
					else
						res.send({
							ok: true,
							data
						})
				}
			} catch (ex) {
				const message = ex && ex.message
				if (message)
					res.send({
						ok: false,
						message: message.toString()
					})
				else
					res.send({
						ok: false
					})
			}
		})
	}

	init() { }

}
