import { ValidationScheme } from "../../mongo/validation";

export interface User {
	name: string,
	password: string,
	displayName: string,
	admin: boolean
}

export const UserScheme: ValidationScheme = {
	name: 'string',
	password: 'string',
	displayName: 'string',
	admin: 'boolean'
}
