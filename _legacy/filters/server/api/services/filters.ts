import FilterService from '../../mongo/services/filters';
import { requireIdentity } from './auth';
import { default as IdentitytProvider, Identity } from '../identity';
import { Filter, User } from '../../mongo/types';
import { deleteIdField } from '../../mongo/util';
import { RequestContext } from '../../';
import { Request } from 'express';

// // function preprocess<T>(cb: (id: Identity, filter: FilterService) => T): (ctx: RequestContext) => T;
// // function preprocess<T, S>(cb: (id: Identity, filter: FilterService, data: S) => T): (ctx: RequestContext, data: S) => T;
// function preprocess<T, S>(cb: (id: Identity, filter: FilterService, data?: S) => T): (ctx: RequestContext, data?: S) => T {
// 	return (ctx) => {
// 		const { req, data } = ctx
// 		const id = requireIdentity(ctx)
// 		const { filters } = data.ms
// 		return cb(id, filters)
// 	}
// }

// export const get = preprocess((id, filters) =>
// 	filters.get(id.id)
// )

// export const addFilter = preprocess((id, filters, filter: Filter) =>
// 	filters.addFilter(id.id, filter)
// )

// export const removeFilter = preprocess((id, filters, filter: Filter) =>
// 	filters.removeFilter(id.id, filter)
// )

// export const removeAll = preprocess((id, filters) =>
// 	filters.removeFilters(id.id)
// )

export const get = (id: Identity, filters: FilterService) =>
	filters.get(id.id)

export const getAll = (filters: FilterService) =>
	filters.getAll()

export const addFilter = (id: Identity, filters: FilterService, filter: Filter) =>
	filters.addFilter(id.id, filter)

export const changeFilter = (id: Identity, filters: FilterService, filter: Filter) =>
	filters.changeFilter(id.id, filter)

export const removeFilter = (id: Identity, filters: FilterService, title: string) =>
	filters.removeFilter(id.id, title)

export const removeAll = (id: Identity, filters: FilterService) =>
	filters.removeFilters(id.id)
