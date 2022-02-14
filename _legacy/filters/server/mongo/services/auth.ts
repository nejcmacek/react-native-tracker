import EventHandler from '../event-handler';
import { MongoDocument, User } from '../types';
import { validate } from '../util';
import { Db, MongoCallback, FindOneOptions, Collection, ObjectID } from 'mongodb'
import config from '../config'

export default class AuthService {

	private users: Collection

	constructor(private db: Db, private eh: EventHandler) {
		this.users = db.collection(config.collections.users)
	}

	validateCredentials = (name: string, password: string) =>
		this.users.findOne<User & MongoDocument>({ name, password })
			.then(t => !!t)

	validateCredentialsAndGet = (name: string, password: string) =>
		this.users.findOne<User & MongoDocument>({ name, password })

	register = async (user: User) => {
		if (await this.exists(user.name))
			return false;
		const res = await this.users.insertOne(user)
		this.eh.emit("user-added", { user, id: res.insertedId.toHexString() })
		return true
	}

	get = (name: string) =>
		this.users.findOne<User & MongoDocument>({ name })

	update = (user: User) =>
		this.users.replaceOne({ name: user.name }, user)
			.then(t => !!t.result.n)

	updateOrRegister = async (user: User) => {
		const res = await this.users.replaceOne({ name: user.name }, user, { upsert: true })
		this.eh.emit("user-added", { user, id: res.upsertedId._id.toHexString() })
	}

	exists = (name: string) =>
		this.users.findOne({ name }).then(t => !!t)

	remove = async (name: string) => {
		const res = await this.users.findOneAndDelete({ name })
		if (res.value)
			this.eh.emit("user-removed", { id: res.value._id.toHexString() })
		return !!res.value
	}

	getAll = () =>
		this.users.find<User & MongoDocument>({}).toArray()

}
