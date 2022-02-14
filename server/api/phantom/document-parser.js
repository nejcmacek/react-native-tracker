var elts = str.split(/>/g);
var element = document.body;

for (var i = 1; i < elts.length; i++) {
	element = element.children.item(elts[i]);
	if (!element) break;
}

if (!element)
	return null;

var rect = element.getBoundingClientRect();
return {
	text: element.innerText,
	rect: {
		left: rect.left,
		top: rect.top,
		height: rect.height,
		width: rect.width
	}
};