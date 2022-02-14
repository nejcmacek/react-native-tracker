import * as loginInfo from './defaults';
import { ILoginResponse } from './types';
import * as rest from '../rest/rest';


export async function getToken(username: string, password: string) {
	if (!username) throw new Error("Username must be given.")
	if (!password) throw new Error("Password must be given.")
	username = username.trim()
	if (!username) throw new Error("Username cannot be empty.")
	try {
		const response = await rest.post<ILoginResponse>(loginInfo.loginPath, { username, password })
		return response.token
	} catch (ex) {
		throw new Error(ex.message)
	}
}
