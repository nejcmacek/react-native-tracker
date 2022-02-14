export interface FormDataSource {
	method: string,
	uri: string,
	body: Object
}

export default function formity(data: FormDataSource) {
	let ret = `<html><head></head><body>
<form action="${data.uri}" method="${data.method}">\n`
	for (const name in data.body) {
		const value = data.body[name]
		ret += `  <input name="${name}" value="${value}" type="hidden" />\n`
	}
	ret += `</form>
<p>Loading...</p>
<script>document.forms.item(0).submit()</script>
</body></html>`
	return ret
}
