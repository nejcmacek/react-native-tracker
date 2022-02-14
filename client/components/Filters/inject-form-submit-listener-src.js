(function () {
	function inject() {
		setTimeout(function () {
			/**
			 * @this HTMLFormElement
			 * @param {HTMLFormElement} form 
			 * @param {Event} e 
			 */
			function ost(form, e) {
				console.log("form submit event captured", e, form);
				if (e.defaultPrevented) return;
				var preventDefault = true
				if (preventDefault)
					e.preventDefault();
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
				var webRequest = `http://localhost:300/rest/util/redirect?method=${request.method}&uri=${encodeURIComponent(request.action)}&body=${encodeURIComponent(JSON.stringify(request.data))}`
				console.log("form submit event captured", request);
				debugger
				return false;
			}
			for (var i = 0; i < document.forms.length; i++) {
				var form = document.forms.item(i);
				form.addEventListener("submit", function (e) {
					return ost(this, e);
				})
			}
			console.log("injected JS loaded, hooks registered");
		}, 100);
	}
	if (document.readyState === "complete") {
		inject();
	} else {
		document.addEventListener("DOMContentLoaded", inject);
	}
})();