import { default as IdentitytProvider, Identity } from '../identity';
import { User } from '../../mongo/types';
import { deleteIdField } from '../../mongo/util';
import { RequestContext } from '../../';
import { Request } from 'express';

export async function getUserFromRequest(ctx: RequestContext) {
	const { req, data } = ctx
	const { name, password } = req.body
	if (!name || !password)
		return null
	return await data.ms.auth.validateCredentialsAndGet(name, password)
}

export async function login(ctx: RequestContext): Promise<Identity> {
	const user = await getUserFromRequest(ctx)
	if (!user) return null
	const { idp, req } = ctx
	const token = IdentitytProvider.getIdentityToken(req)
	idp.remove(token)
	const id = user._id
	deleteIdField(user)
	return idp.set(user, id)
}

export function isLoggedIn(ctx: RequestContext) {
	const { req, idp } = ctx
	const token = IdentitytProvider.getIdentityToken(req)
	return idp.has(token)
}

export function getIdentity(ctx: RequestContext) {
	const { req, idp } = ctx
	const id = idp.process(req)
	return id
}

export function requireIdentity(ctx: RequestContext) {
	return ctx.idp.require(ctx.req)
}

export function requireAdmin(ctx: RequestContext) {
	return ctx.idp.requireAdmin(ctx.req)
}

export function logout(ctx: RequestContext) {
	const { req, idp } = ctx
	const token = IdentitytProvider.getIdentityToken(req)
	idp.remove(token)
}

export function requireAuthenticated(ctx: RequestContext) {
	if (!isLoggedIn(ctx))
		throw new Error("User not authenticated.")
}
