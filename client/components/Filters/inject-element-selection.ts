const injectedJs = `
/**
 * @param {HTMLElement} element 
 * @param {number} n
 */
function getParent(element, n) {
	var parent = element;
	for (var i = 0; i < n; i++) {
		if (!parent.parentElement || parent.parentElement === document.body) {
			return parent;
		}
		parent = parent.parentElement;
	}
	return parent;
}
/**
 * @param {HTMLElement} element 
 */
function setShadow(element) {
	var rect = element.getBoundingClientRect();
	shadow.style.top = (rect.top + document.scrollingElement.scrollTop).toString() + "px";
	shadow.style.left = (rect.left + document.scrollingElement.scrollLeft).toString() + "px";
	shadow.style.width = rect.width.toString() + "px";
	shadow.style.height = rect.height.toString() + "px";
}
/**
 * @param {HTMLElement} element 
 */
function getPath(element) {
	var indexes = [];
	var elt = element;
	while (elt.parentElement) {
		var parent = elt.parentElement;
		var children = Array.prototype.slice.call(parent.children);
		var index = children.indexOf(elt);
		indexes.push(index);
		elt = parent;
	}
	return indexes.reverse().join(">");
}
var body = document.body;
var shadow = document.createElement("div");
shadow.style.background = "rgba(255, 0, 0, 0.4)";
shadow.style.zIndex = Number.MAX_SAFE_INTEGER;
shadow.style.position = "absolute";
shadow.style.display = "none";
shadow.style.pointerEvents = "none";
body.appendChild(shadow);
var threshold = 50;
var ex, ey;
var target;
var element;
var prevOffset;
body.addEventListener("click", function (e) {
	e.preventDefault();
	e.stopPropagation();
	setShadow(e.target);
	shadow.style.display = "block";
	var rect = e.target.getBoundingClientRect();
	var data = {
		path: getPath(e.target),
		rect: {
			left: rect.left + document.scrollingElement.scrollLeft,
			top: rect.top + document.scrollingElement.scrollTop,
			width: rect.width,
			height: rect.height
		},
		text: e.target.innerText
	};
	console.log("element touched", e.target, data);
	window.postMessage(JSON.stringify({ message: "element-selection-event", data: data }));
});
console.log("hooks registered");`

export default injectedJs
