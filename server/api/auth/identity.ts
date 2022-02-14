import { EventEmitter } from "events";
import AuthService from "../../mongo/services/auth";
import encryptPassword from "./encrypt-password";
import { Document, DocumentInstance } from "../../mongo/document";
import { User } from "./auth";
import { Request } from "express"
declare var uuid: () => string
import * as uuid from 'uuid/v4';

export interface Identity {
	user: Document<User>
	token: string
}

interface ForceTokenMapping {
	[name: string]: string
}

export default class IdentityProvider {

	forceTokenMapping: ForceTokenMapping = {}
	identities: Identity[] = []

	constructor(
		private readonly events: EventEmitter,
		private readonly authService: AuthService
	) {
		events.on(authService.addedEventName as string, (t: DocumentInstance<User>) => this.logoutById(t._id))
	}

	async login(name: string, password: string) {
		if (this.isLoggedIn(name))
			return this.getByName(name) as Identity
		password = encryptPassword(password)
		const user = await this.authService.validateCredentialsAndGet(name, password)
		if (!user)
			return null
		return this.loginUser(user)
	}

	private loginUser(user: Document<User>): Identity {
		const token = this.forceTokenMapping[user.name] || uuid()
		const identity = {
			token,
			user
		}
		this.identities.push(identity)
		return identity
	}

	private removeIdentityAt(index: number) {
		if (index >= 0 && index < this.identities.length)
			this.identities.splice(index, 1)
	}

	logout(identity: Identity) {
		this.removeIdentityAt(this.identities.indexOf(identity))
	}

	logoutByName(name: string) {
		this.removeIdentityAt(this.identities.findIndex(id => id.user.name === name))
	}

	logoutById(userId: string) {
		this.removeIdentityAt(this.identities.findIndex(id => id.user._id === userId))
	}

	logoutByToken(token: string) {
		this.removeIdentityAt(this.identities.findIndex(id => id.token === token))
	}

	async register(user: User) {
		user = { ...user }
		if (!user.name)
			throw new Error("Username cannot be empty.")
		user.name = user.name.trim()
		if (!user.name)
			throw new Error("username cannot be an empty string.")
		if (!user.password)
			throw new Error("Password cannot be empty.")
		if (!user.displayName)
			throw new Error("Display name cannot be empty.")
		user.displayName = user.displayName.trim()
		if (!user.displayName)
			throw new Error("Display name cannot be an empty string.")
		if (await this.authService.exists({ name: user.name }))
			throw new Error("Name is already taken.")
		user.password = encryptPassword(user.password)
		const duser = await this.authService.insert(user)
		return this.loginUser(duser)
	}

	assignToken(name: string, token?: string) {
		if (token)
			this.forceTokenMapping[name] = token
		else
			delete this.forceTokenMapping[name]
	}

	isLoggedIn(name: string) {
		return !this.identities.every(t => t.user.name !== name)
	}

	isLoggedInId(userId: string) {
		return !this.identities.every(t => t.user._id !== userId)
	}

	isLoggedInToken(token: string) {
		return !this.identities.every(t => t.token !== token)
	}

	getById(userId: string) {
		return this.identities.find(t => t.user._id === userId) || null
	}

	getByName(name: string) {
		return this.identities.find(t => t.user.name === name) || null
	}

	getByToken(token: string) {
		return this.identities.find(t => t.token === token) || null
	}

	getByRequest(req: Request) {
		const token = IdentityProvider.getToken(req)
		return this.getByToken(token)
	}

	requireAuthentication(req: Request) {
		const token = IdentityProvider.getToken(req)
		const identity = this.getByToken(token)
		if (!identity) {
			throw new Error("Authentication required.")
		}
		return identity
	}

	requireAdmin(req: Request) {
		const identity = this.requireAuthentication(req)
		if (!identity.user.admin)
			throw new Error("Insufficient permission.")
		return identity
	}

	static getToken(req: Request) {
		return req.header("Identity-Token")
	}

}