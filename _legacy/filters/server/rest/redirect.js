"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./endpoints");
const attach_1 = require("../util/attach");
exports.default = attach_1.default({
    path: endpoints_1.default.util.redirect,
    verb: 'all',
    raw: true
}, async (context) => {
    const { req, res } = context;
    const body = Object.assign({}, req.query, req.body);
    if (typeof body.body === "string")
        body.body = JSON.parse(body.body);
    body.uri = body.uri || body.action;
    res.setHeader("Content-Type", "text/html");
    let ret = `<html><head></head><body>
	<form action="${body.uri}" method="${body.method}">\n`;
    for (const name in body.body) {
        const value = body.body[name];
        ret += `		<input name="${name}" value="${value}" type="hidden" />\n`;
    }
    ret += `	</form>
	<p>Redirecting to: ${body.method + " " + body.uri}</p>
	<p>${JSON.stringify(body.body)}</p>
	<script>
	document.forms.item(0).submit()
	</script>
</body></html>`;
    return ret;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWRpcmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUVwQywyQ0FBb0M7QUFRcEMsa0JBQWUsZ0JBQU0sQ0FBTztJQUMzQixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUTtJQUM3QixJQUFJLEVBQUUsS0FBSztJQUNYLEdBQUcsRUFBRSxJQUFJO0NBQ1QsRUFBRSxLQUFLLEVBQUMsT0FBTztJQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBQzVCLE1BQU0sSUFBSSxxQkFBc0IsR0FBRyxDQUFDLEtBQUssRUFBSyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUE7SUFDeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSyxJQUFZLENBQUMsTUFBTSxDQUFBO0lBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzFDLElBQUksR0FBRyxHQUFHO2lCQUNNLElBQUksQ0FBQyxHQUFHLGFBQWEsSUFBSSxDQUFDLE1BQU0sTUFBTSxDQUFBO0lBQ3RELEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsR0FBRyxJQUFJLGtCQUFrQixJQUFJLFlBQVksS0FBSyxzQkFBc0IsQ0FBQTtJQUNyRSxDQUFDO0lBQ0QsR0FBRyxJQUFJO3NCQUNjLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHO01BQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztlQUloQixDQUFBO0lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNYLENBQUMsQ0FBQyxDQUFBIn0=