import { Db } from "mongodb"
import { EventEmitter } from "events";
import AuthService from "./services/auth";
import FilterService from "./services/filters";

export default class MongoService {

	constructor(
		public readonly db: Db,
		public readonly events: EventEmitter
	) {
		this.auth = new AuthService(db, events)
		this.filters = new FilterService(db, events)
	}

	auth: AuthService
	filters: FilterService

}
