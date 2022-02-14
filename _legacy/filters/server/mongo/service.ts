import EventHandler from './event-handler';
import FilterService from './services/filters';
import AuthService from './services/auth';
import { Db } from "@types/mongodb";

export default class MongoService {

	private eh: EventHandler = new EventHandler()

	constructor(private db: Db) { }

	auth = new AuthService(this.db, this.eh)
	filters = new FilterService(this.db, this.eh)

}