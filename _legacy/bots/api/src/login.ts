import { IRestResponse, IRestResponseData } from './rest';

export const loginPath = "/api/auth/"
export const registerPath = "/api/auth/register/"

export interface ILoginResponse extends IRestResponseData {
	token: string
}

export enum LoginError {
	Unknown,
	InvalidCredentials
}
