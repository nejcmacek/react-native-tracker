import IdentitytProvider from '../api/identity';
import { Express, Response, Request, RequestHandler, NextFunction, RequestParamHandler, ErrorRequestHandler } from 'express'

export interface AttachContext<T> {
	app: Express
	idp: IdentitytProvider
	data?: T
}

export interface RequestContext<T> extends AttachContext<T> {
	req: Request
	res: Response
	next: Function
}

export interface Options {
	verb?: string
	path: string | RegExp
	raw?: boolean
	subscription?: (app: Express, callback: RequestHandler) => void
}

export type Handler<T> = (context: RequestContext<T>) => Promise<any>
export type AttachFn<T> = (context: AttachContext<T>) => void
export type AttachPromise<T = any> = (options: Partial<Options>, handler: Handler<T>) => AttachFn<T>

export default function attach<T = any>(options: Options, handler: Handler<T>): AttachFn<T> {
	return (context) => {
		const { app, idp, data } = context
		const onRequestCallback: RequestHandler = (req, res, next) => {
			console.log("Incoming connection", req.method, req.url, req.body)
			handler({ app, idp, data, req, res, next }).then(data => {
				if (options.raw)
					res.send(data)
				else
					res.send({ ok: true, data })
			}, err => {
				const error = err ? err.message || err : err
				res.send({ ok: false, error })
			})
		}
		if (options.subscription)
			options.subscription(app, onRequestCallback)
		else
			app[(options.verb || 'post').toLowerCase()](options.path, onRequestCallback)
	}
}
