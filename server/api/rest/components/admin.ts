import { ApplicationContext } from "../../../index";
import RestServiceComponent, { BindCallback } from "../component";
import RestService from "../index";
import endpoints from "../endpoints";
import encryptPassword from "../../auth/encrypt-password";

export default class AdminRestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.bind({
			path: endpoints.admin
		}, (req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*")
			return this.onCall(req, res, next)
		})
	}

	onCall: BindCallback = async (req, res, next) => {
		const action = req.query && req.query.action
		switch (action) {
			case "getUsers":
				return await this.getUsers(req, res, next)
			case "getFilters":
				return await this.getFilters(req, res, next)
			case "changeUser":
				return await this.changeUser(req, res, next)
			case "changeFilter":
				return await this.changeFilter(req, res, next)
			case "addUser":
				return await this.addUser(req, res, next)
			case "addFilter":
				return await this.addFilter(req, res, next)
			case "removeUser":
				return await this.removeUser(req, res, next)
			case "removeFilter":
				return await this.removeFilter(req, res, next)
			case "changeSettings":
				return await this.changeSettings(req, res, next)
			case "getSettings":
				return await this.getSettings(req, res, next)
			case "defaultAction":
				return await this.defaultAction(req, res, next)
			default:
				throw new Error("Unknown action.")
		}
	}

	getUsers: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		return await mongo.auth.findAll()
	}

	getFilters: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		return await mongo.filters.findAll()
	}

	changeUser: BindCallback = async (req, res, next) => {
		const { mongo, idp } = this.context
		const { update, id } = req.body
		if ("password" in update) {
			if (!update.password)
				delete update.password
			else {
				idp.logoutById(id)
				update.password = encryptPassword(update.password)
			}
		}
		return await mongo.auth.update(id, update as any)
	}

	changeFilter: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		const { update, id } = req.body
		return await mongo.filters.update(id, update as any)
	}

	addUser: BindCallback = async (req, res, next) => {
		const { mongo, idp } = this.context
		return (await idp.register(req.body)).user
	}

	addFilter: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		return await mongo.filters.insert(req.body as any)
	}

	removeUser: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		return await mongo.auth.remove(req.body.id)
	}

	removeFilter: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		return await mongo.filters.remove(req.body.id)
	}

	getSettings: BindCallback = async (req, res, next) => {
		const { fct } = this.context
		return fct.getSettings()
	}

	changeSettings: BindCallback = async (req, res, next) => {
		const { fct } = this.context
		fct.changeSettings(req.body)
	}

	defaultAction: BindCallback = async (req, res, next) => {
		const { mongo } = this.context
		throw new Error("Not yet implemented.")
	}

}
