"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.get = (id, filters) => filters.get(id.id);
exports.getAll = (filters) => filters.getAll();
exports.addFilter = (id, filters, filter) => filters.addFilter(id.id, filter);
exports.changeFilter = (id, filters, filter) => filters.changeFilter(id.id, filter);
exports.removeFilter = (id, filters, title) => filters.removeFilter(id.id, title);
exports.removeAll = (id, filters) => filters.removeFilters(id.id);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSx5R0FBeUc7QUFDekcsOEhBQThIO0FBQzlILDhIQUE4SDtBQUM5SCxxQkFBcUI7QUFDckIsOEJBQThCO0FBQzlCLG9DQUFvQztBQUNwQyxnQ0FBZ0M7QUFDaEMsMkJBQTJCO0FBQzNCLEtBQUs7QUFDTCxJQUFJO0FBRUosaURBQWlEO0FBQ2pELHNCQUFzQjtBQUN0QixJQUFJO0FBRUosdUVBQXVFO0FBQ3ZFLG9DQUFvQztBQUNwQyxJQUFJO0FBRUosMEVBQTBFO0FBQzFFLHVDQUF1QztBQUN2QyxJQUFJO0FBRUosdURBQXVEO0FBQ3ZELGdDQUFnQztBQUNoQyxJQUFJO0FBRVMsUUFBQSxHQUFHLEdBQUcsQ0FBQyxFQUFZLEVBQUUsT0FBc0IsS0FDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFTixRQUFBLE1BQU0sR0FBRyxDQUFDLE9BQXNCLEtBQzVDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVKLFFBQUEsU0FBUyxHQUFHLENBQUMsRUFBWSxFQUFFLE9BQXNCLEVBQUUsTUFBYyxLQUM3RSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFFcEIsUUFBQSxZQUFZLEdBQUcsQ0FBQyxFQUFZLEVBQUUsT0FBc0IsRUFBRSxNQUFjLEtBQ2hGLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUV2QixRQUFBLFlBQVksR0FBRyxDQUFDLEVBQVksRUFBRSxPQUFzQixFQUFFLEtBQWEsS0FDL0UsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBRXRCLFFBQUEsU0FBUyxHQUFHLENBQUMsRUFBWSxFQUFFLE9BQXNCLEtBQzdELE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBIn0=