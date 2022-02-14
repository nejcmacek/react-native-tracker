import Service from "../service";
import { EventEmitter } from "events";
import { User, UserScheme } from "../../api/auth/auth";
import { Db } from "mongodb"
import Validator from "../validation";

export default class AuthService extends Service<User> {

	constructor(
		public readonly db: Db,
		events: EventEmitter
	) {
		super(db.collection("auth"),
			events,
			new Validator(UserScheme),
			"user-added",
			"user-removed")
	}

	findByName(name: string) {
		return this.find({ name })
	}

	async register(user: User) {
		const exists = await this.exists({ name: user.name })
		if (exists) return false
		await this.insert(user)
		return true
	}

	validateCredentials(name: string, password: string) {
		return this.exists({
			name,
			password
		})
	}

	validateCredentialsAndGet(name: string, password: string) {
		return this.find({
			name,
			password
		})
	}

}
