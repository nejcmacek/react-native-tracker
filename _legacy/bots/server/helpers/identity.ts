import { Request } from 'express'


export function getIdentityToken(req: Request) {
	const token = req.header('Identity-Token')
	return token || null
}

export interface Identity {
	readonly _token: string
	[key: string]: any
}

interface IdentityTable {
	[key: string]: Identity
}

export class IdentitytProvider {

	private table: IdentityTable = {}

	set(token: string, item: any = null) {
		if (!token) return null
		this.table[token] = { _token: token, ...item }
	}

	get(token: string): Identity {
		if (!token) return null
		return this.table[token]
	}

	has(token: string) {
		if (!token) return false
		return token in this.table
	}

	del(token: string) {
		if (!token) return false
		return delete this.table[token]
	}

	process(req: Request): any {
		const token = getIdentityToken(req);
		if (!token) return null
		if (!(token in this.table))
			this.set(token)
		return this.table[token]
	}

}
