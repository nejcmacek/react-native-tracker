interface User {
	name: string,
	password: string,
	displayName: string,
	admin: boolean
}

interface Filter {
	userId: string
	title: string
	method: string
	uri: string
	track: boolean
	path?: string
	body?: Object
}

type Doc<T> = T & { _id: string }
