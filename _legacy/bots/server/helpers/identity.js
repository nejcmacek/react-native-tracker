"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getIdentityToken(req) {
    var token = req.header('Identity-Token');
    return token || null;
}
exports.getIdentityToken = getIdentityToken;
var IdentitytProvider = (function () {
    function IdentitytProvider() {
        this.table = {};
    }
    IdentitytProvider.prototype.set = function (token, item) {
        if (item === void 0) { item = null; }
        if (!token)
            return null;
        this.table[token] = __assign({ _token: token }, item);
    };
    IdentitytProvider.prototype.get = function (token) {
        if (!token)
            return null;
        return this.table[token];
    };
    IdentitytProvider.prototype.has = function (token) {
        if (!token)
            return false;
        return token in this.table;
    };
    IdentitytProvider.prototype.del = function (token) {
        if (!token)
            return false;
        return delete this.table[token];
    };
    IdentitytProvider.prototype.process = function (req) {
        var token = getIdentityToken(req);
        if (!token)
            return null;
        if (!(token in this.table))
            this.set(token);
        return this.table[token];
    };
    return IdentitytProvider;
}());
exports.IdentitytProvider = IdentitytProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZGVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsMEJBQWlDLEdBQVk7SUFDNUMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFBO0FBQ3JCLENBQUM7QUFIRCw0Q0FHQztBQVdEO0lBQUE7UUFFUyxVQUFLLEdBQWtCLEVBQUUsQ0FBQTtJQThCbEMsQ0FBQztJQTVCQSwrQkFBRyxHQUFILFVBQUksS0FBYSxFQUFFLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsV0FBZ0I7UUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQUssTUFBTSxFQUFFLEtBQUssSUFBSyxJQUFJLENBQUUsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsK0JBQUcsR0FBSCxVQUFJLEtBQWE7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCwrQkFBRyxHQUFILFVBQUksS0FBYTtRQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDeEIsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQzNCLENBQUM7SUFFRCwrQkFBRyxHQUFILFVBQUksS0FBYTtRQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDeEIsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLEdBQVk7UUFDbkIsSUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVGLHdCQUFDO0FBQUQsQ0FBQyxBQWhDRCxJQWdDQztBQWhDWSw4Q0FBaUIifQ==