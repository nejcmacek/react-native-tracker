import { FilterCollection } from './types';
export interface MongoDocument {
	_id: string
}

export interface User {
	name: string
	password: string
	displayName: string
	admin: boolean
}

export interface Filter {
	title: string
	method: string
	uri: string
	track: boolean
	path?: string
	body?: Object
}

export type FilterCollection = {
	user: string
	filters: Filter[]
}

