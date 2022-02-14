import { server } from '../../util/defaults'
import { IRestResponse, IRestResponseData } from './response'


export function joinUrl(...parts: string[]) {
	return parts.join('')
	// return urljoin(...parts)
}

export function sendPlain(path: string, method: string, data?: any, headers?: any) {
	const url = joinUrl(server.serverAddress, path)
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(data)
	})
}

export async function send<T extends IRestResponseData = any>(path: string, method: string, data?: any, headers?: any) {
	const res = await sendPlain(path, method, data, headers)
	const json: IRestResponse<T> = await res.json()
	if (!json.ok)
		throw new Error(json.message)
	return json.data;
}

export async function get<T extends IRestResponseData = any>(path: string, data?: any) {
	return await send<T>(path, 'GET', data)
}

export async function post<T extends IRestResponseData = any>(path: string, data?: any) {
	return await send<T>(path, 'POST', data)
}

export async function put<T extends IRestResponseData = any>(path: string, data?: any) {
	return await send<T>(path, 'PUT', data)
}

export async function del<T extends IRestResponseData = any>(path: string, data?: any) {
	return await send<T>(path, 'DELETE', data)
}