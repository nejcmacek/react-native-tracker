export interface IRestResponse<T extends IRestResponseData> {
	ok: boolean
	error?: string
	data?: T
}

export interface IRestResponseData { }
