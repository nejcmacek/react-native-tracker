"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var attach_1 = require("../helpers/attach");
exports.default = attach_1.default({
    verb: 'get',
    path: '/api/history/',
    requireAuthenticated: true
}, function (context) { return __awaiter(_this, void 0, void 0, function () {
    var req, resolve, reject, data, identity, br, _a, botId, _b, count, bot, chat, history, cut;
    return __generator(this, function (_c) {
        req = context.req, resolve = context.resolve, reject = context.reject, data = context.data, identity = context.identity;
        br = data.botRegistry;
        _a = req.query, botId = _a.bot, _b = _a.count, count = _b === void 0 ? -1 : _b;
        bot = br.get(botId);
        if (!bot)
            throw new Error('Bot does not exist.');
        chat = bot.startChat(identity);
        history = chat.botData.history;
        cut = count < 0
            ? history
            : history.slice(Math.max(history.length - count, 0));
        resolve(cut);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBc0JFOztBQXRCRiw0Q0FBdUM7QUFJdkMsa0JBQWUsZ0JBQU0sQ0FBQztJQUNyQixJQUFJLEVBQUUsS0FBSztJQUNYLElBQUksRUFBRSxlQUFlO0lBQ3JCLG9CQUFvQixFQUFFLElBQUk7Q0FDMUIsRUFBRSxVQUFNLE9BQU87UUFDUCxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUN0QyxFQUFFLE1BQ0ssS0FBSyxNQUFFLEtBQUssRUFFbkIsR0FBRyxFQUVILElBQUksRUFDRixPQUFPLEVBQ1QsR0FBRzs7Y0FSd0MsT0FBTyxnQkFBUCxPQUFPLG1CQUFQLE9BQU8sZ0JBQVAsT0FBTyxrQkFBUCxPQUFPO2FBQzdDLElBQUksQ0FBQyxXQUEwQjthQUNQLEdBQUcsQ0FBQyxLQUFLLHlEQUFoQixDQUFDLENBQUM7Y0FFbEIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7ZUFDbkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7a0JBQ2hCLElBQUksQ0FBQyxPQUFPO2NBQ3BCLEtBQUssR0FBRyxDQUFDO2NBQ2xCLE9BQU87Y0FDUCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzs7S0FDWixDQUFDLENBQUEifQ==