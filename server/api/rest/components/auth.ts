import { User } from "../../auth/auth";
import { ApplicationContext } from "../../../index";
import RestService from "../index";
import endpoints from "../endpoints";
import IdentityProvider from "../../auth/identity";
import RestServiceComponent, { BindCallback } from "../component";

export interface LoginResult {
	token: string
	displayName: string
}

export interface LoginName {
	name: string
}

export default class AuthRestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.bind({
			path: endpoints.auth
		}, this.onCall)
	}

	onCall: BindCallback = async (req, res, next) => {
		const action = req.query && req.query.action
		switch (action) {
			case "login":
				return await this.onLogin(req, res, next)
			case "logout":
				return await this.onLogout(req, res, next)
			case "register":
				return await this.onRegister(req, res, next)
			case "getAll":
				return await this.onGetAll(req, res, next)
			case "remove":
				return await this.onRemove(req, res, next)
			default:
				throw new Error("Unknown action.")
		}
	}

	onLogin: BindCallback = async (req, res, next): Promise<LoginResult> => {
		const { name, password } = req.body
		const identity = await this.context.idp.login(name, password)
		if (!identity)
			throw new Error("Invalid credentials.")
		return {
			token: identity.token,
			displayName: identity.user.displayName
		}
	}

	onLogout: BindCallback = async (req, res) => {
		const token = IdentityProvider.getToken(req)
		if (token)
			this.context.idp.logoutByToken(token)
	}

	onRegister: BindCallback = async (req, res, next): Promise<LoginResult> => {
		const { idp, mongo } = this.context
		const user = req.body as User
		user.admin = !!user.admin // it is optional
		if (user.admin)
			idp.requireAdmin(req)
		const identity = await idp.register(user)
		return {
			displayName: identity.user.displayName,
			token: identity.token
		}
	}

	onGetAll: BindCallback = async (req, res, next) => {
		const { idp, mongo } = this.context
		const identity = idp.requireAdmin(req)
		const showIds = req.query.showIds !== undefined || false
		const users = await mongo.auth.findAll()
		return users.map(t => t.project({ _id: showIds, password: false }, true))
	}

	onRemove: BindCallback = async (req, res, next): Promise<boolean> => {
		const { idp, mongo } = this.context
		// const identity = idp.requireAdmin(req)
		const no = req.body as LoginName
		if (!no || !no.name)
			throw new Error("Name must be given.")
		const r = await mongo.auth.remove({
			name: no.name
		})
		return !!r
	}

}
