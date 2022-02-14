import { ObjectId } from "mongodb"

interface IndexedObject {
	[key: string]: any
}

export type Projection<T> = {
	[P in keyof T]?: boolean
}
export interface DocumentId {
	readonly _id: string
}
export interface MongoDocumentId {
	readonly _id: ObjectId
}

export type Document<T> = T & DocumentId
export type MongoDocument<T> = T & MongoDocumentId

export class DocumentInstanceBase<T> {

	extractId(): DocumentId {
		return extractId(this as any) as DocumentId
	}

	trimId(): T {
		return trimId(this as any)
	}

	project(proj: Projection<Document<T>>, defaultShow?: boolean) {
		return project<Document<T>>(this as any, proj, defaultShow)
	}

}

export type DocumentInstance<T> = Document<T> & DocumentInstanceBase<T>
export type PartialDocumentInstance<T> = Document<Partial<T>> & DocumentInstance<Partial<T>>

export function createInstance<T>(document: MongoDocument<T>, id?: string | ObjectId): DocumentInstance<T>
export function createInstance<T>(document?: MongoDocument<T> | null, id?: string | ObjectId): DocumentInstance<T> | null
export function createInstance<T>(document: Document<T>, id?: string | ObjectId): DocumentInstance<T>
export function createInstance<T>(document?: Document<T> | null, id?: string | ObjectId): DocumentInstance<T> | null
export function createInstance<T>(document: T, id: string | ObjectId): DocumentInstance<T>
export function createInstance<T>(document?: any, id?: string | ObjectId) {
	if (!document)
		return null
	// Object.setPrototypeOf(document, DocumentInstance.prototype) as T & DocumentInstance<T>
	const clone = Object.create(DocumentInstanceBase.prototype)
	Object.keys(document).forEach(key => {
		if (key !== "_id")
			clone[key] = document[key]
	})
	if (!id && "_id" in document)
		id = (document as Document<T>)._id
	if (!id) throw new Error("No ID field exists.")
	clone._id = typeof id === "string" ? id : id.toHexString()
	return clone as Document<T> & DocumentInstanceBase<Document<T>>
}

export function extractId(object: DocumentId): DocumentId
export function extractId(object: MongoDocumentId): MongoDocumentId
export function extractId(object: DocumentId | MongoDocumentId) {
	if (!("_id" in object))
		throw new Error("ID field is missing in object.")
	return { _id: object._id }
}

export function trimId<T extends IndexedObject>(object: T & DocumentId): T {
	if (!("_id" in object))
		return object
	const clone: any = {}
	Object.keys(object).forEach(key => {
		if (key !== "_id")
			clone[key] = object[key]
	})
	return clone
}

type Projected<R, T extends {[P in keyof R]?}> = {
	[P in keyof R]: T[P]
}

// export function projection<T extends IndexedObject, R extends Projection<T> = Projection<T>>(object: T, projection: R): Projected<R, T> {
export function project<T extends IndexedObject, R extends Projection<T> = Projection<T>>(object: T, projection: R, defaultShow?: boolean): Partial<T> {
	const clone: any = {}
	if (defaultShow === undefined)
		defaultShow = !Object.keys(projection).find(t => projection[t] === true)
	Object.keys(object).forEach(key => {
		const show = projection[key] === undefined
			? defaultShow
			: projection[key]
		if (show)
			clone[key] = object[key]
	})
	return clone
}