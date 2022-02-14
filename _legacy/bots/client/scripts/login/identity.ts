import { getToken } from './login';
import * as rest from '../rest/rest'
import { IRestResponseData } from "../rest/response";

export default class Identity {

	private anonymous: boolean = true
	private token: string = null
	private username: string | null = null

	getUsername = () => this.username
	isAnonymous = () => this.anonymous
	isLoggedIn = () => !this.anonymous

	logOut() {
		this.anonymous = true
		this.username = null
		this.token = null
	}

	async login(username: string, password: string) {
		this.token = await getToken(username, password)
		this.username = username
		this.anonymous = false
	}

	sendRequest<T extends IRestResponseData = any>(path: string, method: string, data?: any, headers?: any) {
		return this.anonymous
			? rest.send(path, method, data, headers)
			: rest.send(path, method, data, { 'Identity-Token': this.token, ...headers })
	}

	post<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, 'POST', data)
	}

	get<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, 'GET', data)
	}

	put<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, 'PUT', data)
	}

	del<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, 'DELETE', data)
	}


}