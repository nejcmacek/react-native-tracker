"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIdentityToken(req) {
    const token = req.header('Identity-Token');
    return token || null;
}
exports.getIdentityToken = getIdentityToken;
class IdentitytProvider {
    constructor() {
        this.table = {};
    }
    set(token, item = null) {
        if (!token)
            return null;
        this.table[token] = Object.assign({ _token: token }, item);
    }
    get(token) {
        if (!token)
            return null;
        return this.table[token];
    }
    has(token) {
        if (!token)
            return false;
        return token in this.table;
    }
    del(token) {
        if (!token)
            return false;
        return delete this.table[token];
    }
    process(req) {
        const token = getIdentityToken(req);
        if (!token)
            return null;
        if (!(token in this.table))
            this.set(token);
        return this.table[token];
    }
}
exports.IdentitytProvider = IdentitytProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZGVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDBCQUFpQyxHQUFZO0lBQzVDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUMxQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQTtBQUNyQixDQUFDO0FBSEQsNENBR0M7QUFXRDtJQUFBO1FBRVMsVUFBSyxHQUFrQixFQUFFLENBQUE7SUE4QmxDLENBQUM7SUE1QkEsR0FBRyxDQUFDLEtBQWEsRUFBRSxPQUFZLElBQUk7UUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFLLE1BQU0sRUFBRSxLQUFLLElBQUssSUFBSSxDQUFFLENBQUE7SUFDL0MsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFhO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWE7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUMzQixDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWE7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ3hCLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFZO1FBQ25CLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FFRDtBQWhDRCw4Q0FnQ0MifQ==