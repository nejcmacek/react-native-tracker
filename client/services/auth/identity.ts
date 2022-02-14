import * as auth from './auth';
import * as rest from '../rest/rest'
import { IRestResponseData } from "../rest/response";

export default class Identity {

	private anonymous: boolean = true
	private token: string = null
	private username: string | null = null
	private displayName: string | null = null

	getDisplayName = () => this.displayName
	getUsername = () => this.username
	isAnonymous = () => this.anonymous;
	isLoggedIn = () => !this.anonymous

	async logout() {
		try {
			await auth.logout(this)
		} catch (ex) { }
		this.anonymous = true
		this.username = null
		this.token = null
	}

	async login(username: string, password: string) {
		const res = await auth.login(username, password)
		this.anonymous = false
		this.username = username
		this.displayName = res.displayName
		this.token = res.token
	}

	async register(username: string, password: string, repeat: string, displayName: string) {
		const res = await auth.register(username, password, repeat, displayName)
		this.anonymous = false
		this.username = username
		this.displayName = res.displayName
		this.token = res.token
	}

	sendRequest<T extends IRestResponseData = any>(path: string, method: string, data?: any, headers?: any) {
		return this.anonymous
			? rest.send<T>(path, method, data, headers)
			: rest.send<T>(path, method, data, { "Identity-Token": this.token, ...headers })
	}

	post<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, "POST", data)
	}

	get<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, "GET", data)
	}

	put<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, "PUT", data)
	}

	del<T extends IRestResponseData = any>(path: string, data?: any) {
		return this.sendRequest<T>(path, "DELETE", data);
	}


}