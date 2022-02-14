import { MongoDocument } from './types';
import { ObjectID } from "@types/mongodb";
export const validate = (...types: string[]) => types.length
	? (...values: any[]) => {
		let i = 0
		for (const val of values) {
			if (typeof val !== types[0])
				return throwInvalidArgument()
			if (i + 1 < types.length)
				i++
		}
	}
	: (...values: any[]) => void (0)

export const throwInvalidArgument = (message?: string): never => { throw new Error(message || "Argument type mismatch.") }

export function cloneNoId<T extends Object>(doc: MongoDocument & T): T {
	const clone: any = {}
	for (const p in doc)
		if (doc.hasOwnProperty(p) && p !== '_id')
			clone[p] = doc[p]
	return clone
}

export function deleteIdField<T>(doc: MongoDocument & T | T): T {
	delete (doc as T & MongoDocument)._id
	return doc
}

export function idToString(id: ObjectID | string) {
	return typeof id === "string"
		? id
		: id.toHexString()
}