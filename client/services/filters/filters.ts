import { Filter, FilterCollection } from '../types';
import endpoints from '../../util/endpoints';
import Identity from '../auth/identity';
import * as defaults from '../../util/defaults'

export interface WebData {
	text?: string | null
	screenshotUrl?: string | null
}

export interface ChangeData {
	text: string | null
	date: number | null
}

export const get = (id: Identity) =>
	id.post<Filter[]>(endpoints.filters + "?action=get")

export const add = (id: Identity, filter: Filter) =>
	id.post(endpoints.filters + "?action=add", filter)

export const remove = (id: Identity, title: string) =>
	id.post(endpoints.filters + "?action=remove", { title })

export const removeAll = (id: Identity) =>
	id.post(endpoints.filters + "?action=removeAll")

export const changeTracking = (id: Identity, title: string, track: boolean) =>
	id.post(endpoints.filters + "?action=changeTracking", { title, track })

export const getData = (id: Identity, title: string) =>
	id.post<WebData>(endpoints.filters + "?action=getWebData", { title })
		.then(t => {
			t.screenshotUrl = defaults.server.serverAddress + t.screenshotUrl
			return t
		})

export const getChange = (id: Identity, title: string) =>
	id.post<ChangeData | null>(endpoints.filters + "?action=getChange", { title })