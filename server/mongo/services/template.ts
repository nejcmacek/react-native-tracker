import Service from "../service";
import { EventEmitter } from "events";
import { Db } from "mongodb"
import Validator from "../validation";

export default class TEMPLATEService extends Service<any> {

	constructor(
		public readonly db: Db,
		events: EventEmitter
	) {
		super(db.collection("TEMPLATE"),
			events,
			new Validator({}))
	}

}
