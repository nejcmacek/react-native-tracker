import { ValidationScheme } from "../../mongo/validation";

export interface Filter {
	userId: string
	title: string
	method: string
	uri: string
	track: boolean
	path?: string
	body?: Object
}

export const FilterScheme: ValidationScheme = {
	userId: 'string',
	title: 'string',
	method: 'string',
	uri: 'string',
	track: 'boolean',
	path: 'string?',
	body: 'object?'
}
