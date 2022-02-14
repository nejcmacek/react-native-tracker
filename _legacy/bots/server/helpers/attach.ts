import { IdentitytProvider } from './identity';
import { Express, Response, Request, RequestHandler, NextFunction, RequestParamHandler, ErrorRequestHandler } from 'express'

interface RequestContext<T> {
	app: Express
	req: Request
	res: Response
	next: Function
	identity: any | null
	data?: T
	resolve: ResolveRequest
	reject: RejectRequest
}

type ResolveRequest = (data: any) => void
type RejectRequest = (error: string, data?: any) => void

export interface AttachContext<T> {
	app: Express
	idp: IdentitytProvider
	data?: T
}

export interface StaticResouceBinding {
	verb: string,
	path: string | RegExp
}

export interface Options {
	requireAuthenticated: boolean
	verb: string
	path: string | RegExp
	subscription: SubscriptionFn
}

export type SubscriptionHandler<T> = (app: RequestContext<T>) => void

export type SubscriptionFn = (app: Express, callback: RequestHandler) => void

export type AttachFn<T = any> = (options: Partial<Options>, handler: SubscriptionHandler<T>) => (context: AttachContext<T>) => void

const attach: AttachFn = (options, handler) =>
	(context) => {
		const { app, idp, data } = context;
		const cb: RequestHandler = (req, res, next) => {
			const resolve: ResolveRequest = (data) => res.send({ ok: true, data })
			const reject: RejectRequest = (error, data) => res.send({ ok: false, error, data })
			console.log('Incoming connection:', req.url)
			const identity = idp.process(req)
			if (options.requireAuthenticated && !identity)
				reject('Not authenticated.')
			else
				try {
					handler({ app, req, res, next, identity, data, resolve, reject })
				} catch (ex) {
					reject(ex.message || ex)
				}
		}
		if (options.subscription)
			options.subscription(app, cb)
		else
			app[options.verb.toLowerCase()](options.path, cb)
	}

export default attach;