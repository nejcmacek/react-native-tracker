export default {
	auth: {
		login: "/rest/auth/login",
		logout: "/rest/auth/logout",
		register: "/rest/auth/register"
	},
	filters: {
		get: "/rest/filters/get",
		getAll: "/rest/filters/getall",
		add: "/rest/filters/add",
		change: "/rest/filters/change",
		remove: "/rest/filters/remove",
		removeAll: "/rest/filters/removeall"
	},
	util: {
		redirect: "/rest/util/redirect"
	},
	misc: {
		dbtest: "/rest/dbtest/",
		template: "/rest/template/"
	}
}
