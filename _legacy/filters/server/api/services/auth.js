"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identity_1 = require("../identity");
const util_1 = require("../../mongo/util");
async function getUserFromRequest(ctx) {
    const { req, data } = ctx;
    const { name, password } = req.body;
    if (!name || !password)
        return null;
    return await data.ms.auth.validateCredentialsAndGet(name, password);
}
exports.getUserFromRequest = getUserFromRequest;
async function login(ctx) {
    const user = await getUserFromRequest(ctx);
    if (!user)
        return null;
    const { idp, req } = ctx;
    const token = identity_1.default.getIdentityToken(req);
    idp.remove(token);
    const id = user._id;
    util_1.deleteIdField(user);
    return idp.set(user, id);
}
exports.login = login;
function isLoggedIn(ctx) {
    const { req, idp } = ctx;
    const token = identity_1.default.getIdentityToken(req);
    return idp.has(token);
}
exports.isLoggedIn = isLoggedIn;
function getIdentity(ctx) {
    const { req, idp } = ctx;
    const id = idp.process(req);
    return id;
}
exports.getIdentity = getIdentity;
function requireIdentity(ctx) {
    return ctx.idp.require(ctx.req);
}
exports.requireIdentity = requireIdentity;
function requireAdmin(ctx) {
    return ctx.idp.requireAdmin(ctx.req);
}
exports.requireAdmin = requireAdmin;
function logout(ctx) {
    const { req, idp } = ctx;
    const token = identity_1.default.getIdentityToken(req);
    idp.remove(token);
}
exports.logout = logout;
function requireAuthenticated(ctx) {
    if (!isLoggedIn(ctx))
        throw new Error("User not authenticated.");
}
exports.requireAuthenticated = requireAuthenticated;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBcUU7QUFFckUsMkNBQWlEO0FBSTFDLEtBQUssNkJBQTZCLEdBQW1CO0lBQzNELE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ1osTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQ3BFLENBQUM7QUFORCxnREFNQztBQUVNLEtBQUssZ0JBQWdCLEdBQW1CO0lBQzlDLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ3RCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLGtCQUFpQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNuQixvQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN6QixDQUFDO0FBVEQsc0JBU0M7QUFFRCxvQkFBMkIsR0FBbUI7SUFDN0MsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDeEIsTUFBTSxLQUFLLEdBQUcsa0JBQWlCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDdEIsQ0FBQztBQUpELGdDQUlDO0FBRUQscUJBQTRCLEdBQW1CO0lBQzlDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQ3hCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0IsTUFBTSxDQUFDLEVBQUUsQ0FBQTtBQUNWLENBQUM7QUFKRCxrQ0FJQztBQUVELHlCQUFnQyxHQUFtQjtJQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2hDLENBQUM7QUFGRCwwQ0FFQztBQUVELHNCQUE2QixHQUFtQjtJQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3JDLENBQUM7QUFGRCxvQ0FFQztBQUVELGdCQUF1QixHQUFtQjtJQUN6QyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQTtJQUN4QixNQUFNLEtBQUssR0FBRyxrQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyRCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2xCLENBQUM7QUFKRCx3QkFJQztBQUVELDhCQUFxQyxHQUFtQjtJQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7QUFDNUMsQ0FBQztBQUhELG9EQUdDIn0=