export interface IRestResponse<T extends IRestResponseData> {
	ok: boolean
	message?: string
	data?: T
}

export interface IRestResponseData { }
