import { IRestResponse, IRestResponseData } from '../rest/response';

export interface ILoginResponse extends IRestResponseData {
	token: string
}
