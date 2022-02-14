const injectedJs = (preventSubmission: boolean) => `(function () {
	function inject() {
		setTimeout(function () {
			/**
			 * @this HTMLFormElement
			 * @param {HTMLFormElement} form 
			 * @param {Event} e 
			 */
			function ost(form, e) {
				debugger;
				if (e.defaultPrevented) return;
				console.log("form submit event captured", e, form);
				${preventSubmission ? "/* " : ""} e.preventDefault(); ${preventSubmission ? " */" : ""}
				var data = {};
				for (var i = 0; i < form.elements.length; i++) {
					var elt = form.elements.item(i);
					if (elt.name)
						data[elt.name] = elt.value;
				}
				var request = {
					method: form.method,
					action: form.action,
					data: data
				};
				console.log("form submit event captured", request);
				window.postMessage(JSON.stringify({
					message: "form-submit-intercept",
					data: request
				}));
				return false;
			}
			for (var i = 0; i < document.forms.length; i++) {
				var form = document.forms.item(i);
				form.addEventListener("submit", function (e) {
					return ost(this, e);
				})
			}
			console.log("injected JS loaded, hooks registered");
			window.postMessage("DONE MAN2")
		}, 500);
	}
	if (document.readyState === "complete") {
		inject();
	} else {
		document.addEventListener("DOMContentLoaded", inject);
	}
})();`

export default injectedJs
