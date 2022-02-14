import { ApplicationContext } from "../../../index";
import RestServiceComponent, { BindCallback } from "../component";
import RestService from "../index";
import endpoints from "../endpoints";

export default class TEMPLATERestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.bind({
			path: "TEMPLATE"
		}, this.onCall)
	}

	onCall: BindCallback = async (req, res, next) => {
		const action = req.query && req.query.action
		switch (action) {
			case "TEMPLATE":
				return await this.onAction(req, res, next)
			default:
				throw new Error("Unknown action.")
		}
	}

	onAction: BindCallback = async (req, res, next) => {
		throw new Error("Not yet implemented.")
	}

}
