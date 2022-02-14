import { requireIdentity } from '../api/services/auth';
import { RequestContext } from '../util/attach';
import FilterService from '../mongo/services/filters';
import { Identity } from '../api/identity';
import { deleteIdField } from '../mongo/util';
import { Filter, MongoDocument } from '../mongo/types';
import * as filters from '../api/services/filters';
import endpoints from './endpoints';
import { Data } from '../';
import attach from '../util/attach';

// function preprocess<T>(context: RequestContext<Data>, cb: (id: Identity, filters: FilterService) => T) {
// 	const id = requireIdentity(context)
// 	return cb(id, context.data.ms.filters)
// }

export default [
	attach<Data>({
		path: endpoints.filters.getAll
	}, async context => {
		return await filters.getAll(context.data.ms.filters)
	}),
	attach<Data>({
		path: endpoints.filters.get
	}, async context => {
		const id = requireIdentity(context)
		return deleteIdField(await filters.get(id, context.data.ms.filters))
	}),
	attach<Data>({
		path: endpoints.filters.change
	}, async context => {
		const id = requireIdentity(context)
		const filter = context.req.body as Filter
		return await filters.changeFilter(id, context.data.ms.filters, deleteIdField(filter))
	}),
	attach<Data>({
		path: endpoints.filters.add
	}, async context => {
		const id = requireIdentity(context)
		const filter = context.req.body as Filter
		return await filters.addFilter(id, context.data.ms.filters, deleteIdField(filter))
	}),
	attach<Data>({
		path: endpoints.filters.remove,
		verb: "delete"
	}, async context => {
		const id = requireIdentity(context)
		const title = context.req.body.title as string
		return await filters.removeFilter(id, context.data.ms.filters, title)
	}),
	attach<Data>({
		path: endpoints.filters.removeAll,
		verb: "delete"
	}, async context => {
		const id = requireIdentity(context)
		return await filters.removeAll(id, context.data.ms.filters)
	})
]
