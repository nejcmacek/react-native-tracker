import endpoints from './endpoints';
import { Data } from '../';
import attach from '../util/attach';
import * as auth from '../api/services/auth';

export default [
	attach<Data>({ // login
		path: endpoints.auth.login,
		verb: 'post'
	}, async context => {
		const id = await auth.login(context)
		if (id) return {
			token: id.token,
			displayName: id.user.displayName
		}
		else throw new Error("Invalid credentials.")
	}),
	attach<Data>({ // logout
		path: endpoints.auth.logout,
		verb: 'post'
	}, async context => {
		auth.logout(context)
	})
]
