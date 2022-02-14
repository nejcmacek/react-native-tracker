import endpoints from './endpoints';
import { Data } from '../';
import attach from '../util/attach';

interface RedirectInfo {
	method?: string
	uri: string
	body?: Object
}

export default attach<Data>({
	path: endpoints.util.redirect,
	verb: 'all',
	raw: true
}, async context => {
	const { req, res } = context
	const body: RedirectInfo = { ...req.query, ...req.body }
	if (typeof body.body === "string")
		body.body = JSON.parse(body.body)
	body.uri = body.uri || (body as any).action
	res.setHeader("Content-Type", "text/html")
	let ret = `<html><head></head><body>
	<form action="${body.uri}" method="${body.method}">\n`
	for (const name in body.body) {
		const value = body.body[name]
		ret += `		<input name="${name}" value="${value}" type="hidden" />\n`
	}
	ret += `	</form>
	<p>Redirecting to: ${body.method + " " + body.uri}</p>
	<p>${JSON.stringify(body.body)}</p>
	<script>
		document.forms.item(0).submit()
	</script>
</body></html>`
	return ret
})
