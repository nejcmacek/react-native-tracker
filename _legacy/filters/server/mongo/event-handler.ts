import { User } from './types';

interface UserIdEvent {
	id: string
}

interface UserEvent extends UserIdEvent {
	user: User
}

interface Table {
	[key: string]: Function[]
}

export default class EventHandler {

	private table: Table = {}

	on(type: "user-added", cb: (e: UserEvent) => void)
	on(type: "user-removed", cb: (e: UserIdEvent) => void)
	on(type, cb) {
		if (!(type in this.table))
			this.table[type] = []
		this.table[type].push(cb)
	}

	emit(type: "user-added", e: UserEvent)
	emit(type: "user-removed", e: UserIdEvent)
	emit(type: string, e: any) {
		if (!(type in this.table))
			return
		this.table[type].forEach(t => t.call(null, e));
	}

}