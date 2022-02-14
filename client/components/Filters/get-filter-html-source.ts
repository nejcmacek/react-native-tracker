import { Filter } from "../../services/types";
import { WebViewHtmlSource, WebViewUriSource } from 'react-native'

export function parseHtml(filter: Filter) {
	let ret = `<html><head></head><body>
	<form action="${filter.uri}" method="${filter.method}">`
	for (const name in filter.body) {
		const value = filter.body[name]
		ret += `		<input name="${name}" value="${value}" type="hidden" />\n`
	}
	ret += `	</form>
	<p>Redirecting to: ${filter.method + " " + filter.uri}</p>
	<p>${JSON.stringify(filter.body)}</p>
	<script>
		document.forms.item(0).submit()
	</script>
</body></html>`
	return ret
}

export default function getFilterWebViewSource(filter: Filter) {
	if (filter.method.toLowerCase() === "post") {
		const tmp: WebViewHtmlSource = {
			baseUrl: filter.uri,
			html: parseHtml(filter)
		}
		return tmp
	} else {
		const tmp: WebViewUriSource = {
			uri: filter.uri,
			method: filter.method
		}
		return tmp
	}
}
