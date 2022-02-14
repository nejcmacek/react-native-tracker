export const endpoint = "http://localhost:3000/rest/admin"

interface RestData<T> {
	ok: boolean
	data?: T
	message?: string
}

interface Settings {
	enabled: boolean
	interval: number
}

function fn(url, data) {
	return new Promise((resolve, reject) => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify(data));
		xmlhttp.onreadystatechange = () => {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				resolve(JSON.parse(xmlhttp.responseText))
			} else if (xmlhttp.readyState == 4) {
				reject("Could not communicate.")
			}
		}
	})
}

function trimId(obj: any) {
	const clone = { ...obj }
	delete clone._id
	return clone
}

export async function post<T>(action: string, data?: any) {
	const url = endpoint + "?action=" + action
	// const res = await fetch(url, {
	// 	method: "POST",
	// 	body: data
	// })
	// const d = await res.json() as RestData<T>
	const d = await fn(url, data) as RestData<T>
	if (d.ok)
		return d.data
	throw new Error(d.message)
}

export function getUsers() {
	return post<User[]>("getUsers")
}

export function getFilters() {
	return post<Filter[]>("getFilters")
}

export function changeUser(user: User) {
	return post<User>("changeUser", {
		id: user._id,
		update: trimId(user)
	})
}

export function changeFilter(filter: Filter) {
	return post<Filter>("changeFilter", {
		id: filter._id,
		update: trimId(filter)
	})
}

export function addUser(user: User) {
	return post<User>("addUser", trimId(user))
}

export function addFilter(filter: Filter) {
	return post<Filter>("addFilter", trimId(filter))
}

export function removeUser(user: User) {
	return post<User>("removeUser", { id: user._id })
}

export function removeFilter(filter: Filter) {
	return post<Filter>("removeFilter", { id: filter._id })
}

export function getSettings() {
	return post<Settings>("getSettings")
}

export function changeSettings(settings: Settings) {
	return post<void>("changeSettings", settings)
}

