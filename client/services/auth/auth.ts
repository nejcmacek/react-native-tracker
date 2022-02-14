import { IRestResponseData } from '../rest/response';
import Identity from './identity';
import endpoints from '../../util/endpoints'
import * as rest from '../rest/rest';

export interface ILoginResponse extends IRestResponseData {
	token: string
	displayName: string
}

export async function login(username: string, password: string) {
	if (!username) throw new Error("Username must be given.")
	if (!password) throw new Error("Password must be given.")
	username = username.trim()
	if (!username) throw new Error("Username cannot be empty.")

	const response = await rest.post<ILoginResponse>(endpoints.auth + "?action=login", { name: username, password })
	return response
}

export async function register(name: string, password: string, repeat: string, displayName: string) {
	name = name && name.trim()
	displayName = displayName && displayName.trim()
	if (!name)
		throw new Error("Username cannot be empty.")
	if (!password)
		throw new Error("Password cannot be empty.")
	if (!displayName)
		throw new Error("Display name must be given.")
	if (password !== repeat)
		throw new Error("Passwords do not match.")

	const user = {
		name,
		password,
		displayName
	}
	const response = rest.post<ILoginResponse>(endpoints.auth + "?action=register", user)
	return response
}

export async function logout(id: Identity) {
	try {
		await id.post(endpoints.auth + "?action=logoout")
	} catch (ex) { }
}