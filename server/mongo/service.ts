import { ObjectId, Db, Collection } from "mongodb"
import { EventEmitter } from "events";
import { DocumentInstance, DocumentId, createInstance, Document, PartialDocumentInstance } from "./document";
import Validator from "./validation";

export default class Service<T> {

	constructor(
		public readonly collection: Collection,
		public readonly events: EventEmitter,
		public readonly validator: Validator,
		public readonly addedEventName: string | null = null,
		public readonly removedEventName: string | null = null,
		public readonly changedEventName: string | null = null) { }

	private onAdded(document: DocumentInstance<T>) {
		if (this.addedEventName !== null)
			this.events.emit(this.addedEventName, document)
	}

	private onRemoved(document: DocumentInstance<T>) {
		if (this.removedEventName !== null)
			this.events.emit(this.removedEventName, document)
	}

	private onChanged(document: PartialDocumentInstance<T>) {
		if (this.changedEventName !== null)
			this.events.emit(this.changedEventName, document)
	}

	async exists(id: string): Promise<boolean>
	async exists(filter: Partial<T>): Promise<boolean>
	async exists(filter: string | Partial<T>) {
		const res = await this.find(filter as any)
		return !!res
	}

	async find(id: string): Promise<DocumentInstance<T> | null>
	async find(filter: Partial<T>): Promise<DocumentInstance<T> | null>
	async find(filter: string | Partial<T>) {
		let tmp: Document<T> | null
		if (typeof filter === "string")
			tmp = await this.collection.findOne<Document<T> | null>({ _id: new ObjectId(filter) })
		else
			tmp = await this.collection.findOne<Document<T> | null>(filter as any)
		return createInstance(tmp)
	}

	async insert(document: T) {
		this.validator.validate(document)
		const res = await this.collection.insertOne(document)
		const doc = createInstance(document, res.insertedId)
		this.onAdded(doc)
		return doc
	}

	async remove(id: string): Promise<DocumentInstance<T> | null>
	async remove(filter: Partial<T>): Promise<DocumentInstance<T> | null>
	async remove(filter: string | Partial<T>) {
		const selector = typeof filter === "string"
			? { _id: new ObjectId(filter) }
			: filter
		const f = await this.find(filter as any)
		const res = await this.collection.findOneAndDelete(selector as any)
		if (!res.value)
			return null
		const doc = createInstance(res.value as Document<T>)
		this.onRemoved(doc)
		return doc
	}

	async replace(id: string, document: T): Promise<DocumentInstance<T> | null>
	async replace(filter: Partial<T>, document: T): Promise<DocumentInstance<T> | null>
	async replace(filter: string | Partial<T>, document: T): Promise<DocumentInstance<T> | null> {
		this.validator.validate(document)
		const field = typeof filter === "string"
			? { _id: new ObjectId(filter) }
			: filter
		const res = await this.collection.findOneAndReplace(filter as any, document)
		const val = res && res.value && createInstance(res.value as Document<T>)
		if (val)
			this.onChanged(val)
		return val || null
	}

	async update(id: string, document: Partial<T>): Promise<DocumentInstance<T> | null>
	async update(filter: Partial<T>, document: Partial<T>): Promise<DocumentInstance<T> | null>
	async update(filter: string | Partial<T>, document: Partial<T>): Promise<DocumentInstance<T> | null> {
		this.validator.validate(document, true)
		const field = typeof filter === "string"
			? { _id: new ObjectId(filter) }
			: filter
		let val = await this.find(filter as any) as any
		if (!val)
			return null
		Object.keys(document).forEach(key => {
			val[key] = document[key]
		})
		delete val._id
		const res = await this.collection.findOneAndUpdate(field as any, val as any, { returnOriginal: false })
		val = res && res.value && createInstance(res.value as Document<T>)
		if (val)
			this.onChanged(val)
		return val || null
	}

	async replaceDocument(document: DocumentInstance<T>) {
		const noid = document.trimId()
		this.validator.validate(noid)
		return await this.replace(document._id, document)
	}

	async updateDocument(document: Partial<DocumentInstance<T>> & DocumentId) {
		const noid = (document as any).trimId()
		this.validator.validate(noid, true)
		return await this.update(document._id, noid)
	}

	async change(id: string, transformation: (document: T) => T): Promise<DocumentInstance<T> | null>
	async change(filter: Partial<T>, transformation: (document: T) => T): Promise<DocumentInstance<T> | null>
	async change(filter: Partial<T> | string, transformation: (document: T) => T): Promise<DocumentInstance<T> | null> {
		const item = await this.find(filter as any)
		if (!item) return null
		const modified = transformation(item.trimId())
		this.validator.validate(modified)
		return await this.replace(item._id, modified)
	}

	async changeAll(filter: Partial<T>, transformation: (document: T) => T) {
		const items = await this.findAll(filter)
		const arr = items
			.map(t => t.trimId())
			.map(transformation)
			.map(t => { this.validator.validate(t); return t })
			.map((item, index) => {
				const id = items[index]._id
				return this.replace(id, item)
			})
		return Promise.all(arr)
	}

	async findAll(filter?: Partial<T>) {
		const res = await this.collection.find<Document<T>>(filter as any).toArray()
		return res.map(t => createInstance(t))
	}

	async removeAll(filter: Partial<T>) {
		if (this.removedEventName === null) {
			const res = await this.collection.deleteMany(filter as any)
			return res.deletedCount
		} else {
			const res = await this.collection.find<Document<T>>(filter as any).toArray()
			const rem = await this.collection.deleteMany(filter as any)
			res.forEach(doc => this.onRemoved(createInstance(doc)))
			return rem.deletedCount
		}
	}

}

