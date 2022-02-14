import Service from "../service";
import { EventEmitter } from "events";
import { Db } from "mongodb"
import Validator from "../validation";
import { FilterScheme, Filter } from "../../api/filters/filters";
import { User } from "../../api/auth/auth";
import { DocumentInstance } from "../document";

export default class FilterService extends Service<Filter> {

	constructor(
		public readonly db: Db,
		events: EventEmitter
	) {
		super(db.collection("filters"),
			events,
			new Validator(FilterScheme),
			"filter-added",
			"filter-removed",
			"filter-changed")
		events.on("user-removed", (user: DocumentInstance<User>) => this.delteAllFromUser(user._id))
	}

	byUser(userId: string) {
		return this.findAll({
			userId
		})
	}

	delteAllFromUser(userId: string) {
		return this.removeAll({
			userId
		})
	}

}
