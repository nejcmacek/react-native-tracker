import * as _ from "lodash";

export interface ValidationScheme {
	[key: string]: ValidationType
}

export interface ValidationObject {
	$required?: boolean // default: true
}

type ValidationTypeNames = "string" | "string?" | "number" | "number?" | "boolean" | "boolean?" | "array" | "array?" | "object" | "object?" | "any" | "any?"
type ValidationTypePartial = ValidationTypeNames | (ValidationObject & ValidationScheme)
type ValidationType = ValidationTypePartial | ValidationTypePartial[]

export default class Validator {

	private validator: ValidationFn

	constructor(scheme: ValidationScheme) {
		if ("$required" in scheme && !(scheme as ValidationObject).$required)
			throw new Error("Root object cannot be marked as optional.")
		this.validator = getBaseValidator(scheme)
	}

	validate(obj: any, partial: boolean = false) {
		const msg = this.validator(obj, partial)
		if (msg)
			throw new Error(msg)
	}

	isValid(obj: any, partial: boolean = false) {
		return !!this.validator(obj, partial)
	}

	getValidationMessage(obj: any, partial: boolean = false) {
		return this.validator(obj, partial)
	}

}

const validators: {
	[key: string]: (obj: any) => boolean
} = {
		string: obj => typeof obj === "string",
		number: obj => typeof obj === "number",
		boolean: obj => typeof obj === "boolean",
		array: obj => Array.isArray(obj),
		object: obj => typeof obj === "object",
		any: obj => true,
	}

const optionalValidatorWrapper = (v: ValidationFn, partial: boolean): ValidationFn => (obj: any) => {
	if (obj === undefined || obj === null)
		return null
	return v(obj, partial)
}

interface BoolValidationTable {
	[key: string]: ValidationFn
}
type ValidationFn = (obj: any, partial: boolean) => string | null

const specialKeyNames = ["$required"]

function getObjectValidators(obj: ValidationObject & ValidationScheme): ValidationFn {
	const vobj: BoolValidationTable = {}
	Object.keys(obj).forEach(key => {
		if (specialKeyNames.indexOf(key) >= 0) return // these should be handeled manually
		const value = obj[key]
		vobj[key] = getValidator(value)
	})
	let vfn: ValidationFn = (x, partial) => {
		if (x === null || x === undefined) {
			if (obj.$required) return "Property is required."
			return null
		}
		const allKeys = _.union(Object.keys(x), Object.keys(vobj))
		for (const key of allKeys) {
			const v = vobj[key]
			const value = x[key]
			if (!v) return "Excess property: " + key
			const skipCheck = partial && (value === undefined || value === null)
			if (!skipCheck) {
				const vres = v(value, partial)
				if (vres) return `Invalid value on property "${key}":\n${vres}`
			}
		}
		return null
	}
	return vfn
}

function getBaseValidator(obj: ValidationType): ValidationFn {
	if (!obj)
		throw new Error("A value must be provided.")
	if (typeof obj !== "object")
		throw new Error("Expected an object.")
	const v = getObjectValidators(obj as ValidationScheme & ValidationObject)
	return (x, partial) => {
		if (!x)
			throw new Error("A value must be provided.")
		if (typeof x !== "object")
			throw new Error("Expected an object.")
		return v(x, partial)
	}
}

function getValidator(obj: ValidationType): ValidationFn {
	if (typeof obj === "string")
		return getTypeValidator(obj)
	else if (Array.isArray(obj))
		return getArrayValidator(obj)
	else if (typeof obj === "object")
		return getObjectValidators(obj)
	else
		throw new Error("Unknown scheme property type.")
}

const boolValidationFnWrapper = (v: (obj: any) => boolean, optional: boolean, expectation: string) => (obj: any, partial: boolean) => {
	if ((optional || partial) && (obj === undefined || obj === null))
		return null
	return v(obj) ? null : "Invalid property value, expected: " + expectation
}

function getTypeValidator(obj: ValidationTypeNames): ValidationFn {
	if (obj.endsWith("?")) {
		const v = validators[obj.slice(0, -1)]
		const vv = boolValidationFnWrapper(v, true, obj)
		return vv
	} else {
		const v = validators[obj]
		const vv = boolValidationFnWrapper(v, false, obj)
		return vv
	}
}

function getArrayValidator(obj: ValidationTypePartial[]): ValidationFn {
	if (obj.length !== 1)
		throw new Error("Expected an array with one element.")
	const t = obj[0]
	const v = getValidator(t)

	const vfn: ValidationFn = (obj, partial) => {
		if (!Array.isArray(obj))
			return "Expected an array."
		for (const val of obj) {
			const res = v(val, partial)
			if (res) return res
		}
		return null
	}
	return vfn
}
