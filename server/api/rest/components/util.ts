import { ApplicationContext } from "../../../index";
import RestServiceComponent, { BindCallback } from "../component";
import RestService from "../index";
import endpoints from "../endpoints";

interface RedirectInfo {
	method?: string
	uri: string
	body?: Object
}

export default class UtilityRestServiceComponent extends RestServiceComponent {

	constructor(context: ApplicationContext, restService: RestService) {
		super(context)
		this.bind({
			path: endpoints.util,
			verb: "all",
			noReturnData: true
		}, this.onCall)
	}

	onCall: BindCallback = async (req, res, next) => {
		let action = req.query && req.query.action
		if (Array.isArray(action))
			action = action[0]
		switch (action) {
			case "postRedirection":
				return await this.onAction(req, res, next)
			default:
				throw new Error("Unknown action.")
		}
	}

	onAction: BindCallback = async (req, res, next) => {
		const body: RedirectInfo = { ...req.query, ...req.body }
		res.setHeader("Content-Type", "text/html")
		let ret = `<html><head></head><body>
	<form action="${body.uri}" method="${body.method}">\n`
		for (const name in body) {
			if (name === "uri" || name === "method")
				continue
			const value = body[name]
			ret += `		<input name="${name}" value="${value}" type="hidden" />\n`
		}
		ret += `	</form>
	<p>Redirecting to: ${body.method + " " + body.uri}</p>
	<p>${JSON.stringify(body)}</p>
	<script>
		document.forms.item(0).submit()
	</script>
</body></html>`
		res.send(ret)
	}

}
