import * as path from "path"
import { ApplicationContext } from "../../../index";
import RestServiceComponent, { BindCallback } from "../component";
import RestService from "../index";
import endpoints from "../endpoints";

export default class StaticRestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.context.app.get(endpoints.static, this.onCall.bind(this))
	}

	onCall: BindCallback = async (req, res, next) => {
		const p = path.resolve(path.join(".", req.originalUrl))
		res.sendFile(p)
		return this.noReturnSymbol
	}

}
