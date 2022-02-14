import endpoints from './endpoints';
import { Data } from '../';
import attach from '../util/attach';

export default attach<Data>({
	path: endpoints.misc.dbtest,
	verb: 'all'
}, async context => {
	const { req, data } = context
	const query = { ...req.query, ...req.body }

	const fn = query.fn as string
	const args = query.args as any[] || []

	if (!fn) throw new Error("No function given.")

	const namespace = fn.split(/\./g)
	let parent: any = null
	let handler: any = data.ms
	for (const ns of namespace) {
		parent = handler
		handler = handler[ns]
		if (!handler) throw new Error("Such method does not exist")
	}
	if (typeof handler !== "function")
		throw new Error("Given namespace does not resolve to a function")

	const promise = handler.apply(parent, args)
	const res = await promise
	return res
})
