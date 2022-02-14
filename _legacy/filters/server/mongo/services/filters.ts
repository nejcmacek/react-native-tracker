import EventHandler from '../event-handler';
import { Filter, FilterCollection, MongoDocument, User } from '../types';
import { idToString, validate } from '../util';
import { Db, MongoCallback, FindOneOptions, Collection, ObjectID } from 'mongodb'
import config from '../config'
import * as _ from 'lodash';

export default class FilterService {

	filters: Collection

	constructor(private db: Db, private eh: EventHandler) {
		this.filters = db.collection(config.collections.filters)
		this.eh.on("user-added", e => this.register(FilterService.defaultFilterCollection(e.id)))
		this.eh.on("user-removed", e => this.remove(e.id))
	}

	private static defaultFilterCollection(id: string): FilterCollection {
		return {
			user: id,
			filters: []
		}
	}

	getAll = () =>
		this.filters.find<FilterCollection & MongoDocument>({}).toArray()

	get = (userId: string | ObjectID) =>
		this.filters.findOne<FilterCollection & MongoDocument>({ user: idToString(userId) })

	set = (f: FilterCollection) =>
		this.filters.updateOne({ user: f.user }, f)
			.then(t => !!t.result.n)

	exists = (userId: string | ObjectID) =>
		this.get(idToString(userId)).then(t => !!t)

	register = async (f: FilterCollection) => {
		if (await this.exists(f.user))
			return null
		else
			return await this.filters.insertOne(f)
				.then(t => !!t.result.n)
	}

	update = (f: FilterCollection) =>
		this.filters.replaceOne({ user: f.user }, f)
			.then(t => !!t.result.n)

	updateOrRegister = (f: FilterCollection) =>
		this.filters.replaceOne({ user: f.user }, f, { upsert: true })
			.then(t => !!t.result.n)

	addFilter = async (userId: string | ObjectID, filter: Filter) => {
		const f = await this.get(idToString(userId))
		if (!f.filters.every(t => t.title != filter.title))
			throw new Error("Title already taken.")
		f.filters.push(filter)
		return await this.update(f)
	}

	changeFilter = async (userId: string | ObjectID, filter: Filter) => {
		const f = await this.get(idToString(userId))
		const ff = f.filters.filter(t => t.title != filter.title)
		if (f.filters.length === ff.length)
			throw new Error("Filter does not exist.")
		ff.push(filter)
		f.filters = ff
		return await this.update(f)
	}

	removeFilter = async (userId: string | ObjectID, title: string) => {
		const f = await this.get(idToString(userId))
		if (!f) return false
		const newFilters = f.filters.filter(t => t.title !== title)
		if (newFilters.length === f.filters.length) return false
		f.filters = newFilters
		return await this.update(f)
	}

	removeFitlerAt = async (userId: string | ObjectID, filterIndex: number) => {
		const f = await this.get(idToString(userId))
		if (f && filterIndex >= f.filters.length) return false
		f.filters.splice(filterIndex, 1)
		return await this.update(f)
	}

	removeFilters = async (userId: string | ObjectID) =>
		this.filters.updateOne({ user: idToString(userId) }, { filters: [] })
			.then(t => !!t.result.n)

	remove = (userId: string | ObjectID) =>
		this.filters.remove({ user: idToString(userId) })
			.then(t => !!t.result.n)

}
