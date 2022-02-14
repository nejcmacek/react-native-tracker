export const endpoint = "http://localhost:3000/rest/admin"

export async function post<T>(action: string, data?: any) {
	const url = endpoint + "?action=" + action
	const res = await fetch(url, {
		method: "POST",
		body: data,
		headers: { "Content-Type": "application/json" }
	})
	return await res.json() as T
}
