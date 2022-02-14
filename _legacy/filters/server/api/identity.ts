import { MongoDocument, User } from '../mongo/types';
import { Request } from 'express'
import * as uuid from 'uuid/v4';

export interface Identity {
	readonly id: string
	readonly token: string
	readonly user: User
}

interface IdentityTable {
	[token: string]: Identity
}

export default class IdentitytProvider {

	public static getIdentityToken(req: Request) {
		return req.header('Identity-Token') || null
	}

	private table: IdentityTable = {}

	private generateToken(): string {
		let token = uuid()
		while (this.table[token])
			token = uuid()
		return token
	}

	getAll() {
		return Object.keys(this.table)
	}

	get(token: string): Identity {
		return this.table[token] || null
	}

	getByUsername(name: string): Identity {
		for (const token in this.table) {
			const idt = this.table[token]
			if (idt.user.name === name)
				return idt
		}
		return null
	}

	getById(id: string): Identity {
		for (const token in this.table) {
			const idt = this.table[token]
			if (idt.id === id)
				return idt
		}
		return null
	}

	has(token: string) {
		return token in this.table
	}

	remove(token: string) {
		if (!token) return false
		return delete this.table[token]
	}

	set(user: User, id: string) {
		let idt = this.getById(user.name)
		if (idt) return idt
		const token = this.generateToken()
		idt = { token, id, user }
		this.table[token] = idt
		return idt
	}

	isAdmin(id: Identity) {
		return id.user.admin
	}

	process(req: Request): Identity {
		const token = IdentitytProvider.getIdentityToken(req);
		return this.get(token)
	}

	require(req: Request): Identity {
		const id = this.process(req)
		if (!id) throw new Error("Authentication required.")
		return id
	}

	requireAdmin(req: Request): Identity {
		const id = this.require(req)
		if (!id.user.admin) throw new Error("Not privileged.")
		return id
	}

}
