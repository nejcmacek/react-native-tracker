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
Object.defineProperty(exports, "__esModule", { value: true });
var Bot = (function () {
    function Bot(name, shortName, description, id) {
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.id = id;
    }
    Bot.prototype.startChat = function (identity) {
        if (!identity)
            throw new Error('Cannot chat with anonymous.');
        if (!('bots' in identity))
            identity.bots = {};
        if (!(this.id in identity.bots))
            identity.bots[this.id] = {};
        var data = identity.bots[this.id];
        initBotData(data);
        return new Chat(this, data, identity);
    };
    return Bot;
}());
exports.Bot = Bot;
function initBotData(data) {
    if (!data.history)
        data.history = [];
}
var Chat = (function () {
    function Chat(bot, botData, identity) {
        this.bot = bot;
        this.botData = botData;
        this.identity = identity;
    }
    Chat.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, response, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msg = {
                            text: message,
                            timestamp: Date.now(),
                            sender: true
                        };
                        this.botData.history.push(msg);
                        response = this.bot.respond({
                            msg: msg,
                            identity: this.identity,
                            data: this.botData
                        });
                        if (!response)
                            return [2 /*return*/];
                        return [4 /*yield*/, response];
                    case 1:
                        result = _b.sent();
                        (_a = this.botData.history).push.apply(_a, result);
                        return [2 /*return*/, [msg].concat(result)];
                }
            });
        });
    };
    return Chat;
}());
exports.Chat = Chat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQTtJQUVDLGFBQ2lCLElBQVksRUFDWixTQUFpQixFQUNqQixXQUFtQixFQUNuQixFQUFVO1FBSFYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtJQUN2QixDQUFDO0lBRUwsdUJBQVMsR0FBVCxVQUFVLFFBQWtCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUM7WUFDekIsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7UUFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUM1QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQWdCLENBQUE7UUFDbEQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBVSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFJRixVQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCcUIsa0JBQUc7QUF5QnpCLHFCQUFxQixJQUFhO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtBQUNuQixDQUFDO0FBTUQ7SUFFQyxjQUNpQixHQUFTLEVBQ1QsT0FBOEIsRUFDN0IsUUFBa0I7UUFGbkIsUUFBRyxHQUFILEdBQUcsQ0FBTTtRQUNULFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDaEMsQ0FBQztJQUVDLG1CQUFJLEdBQVYsVUFBVyxPQUFlOztnQkFDbkIsR0FBRyxFQU1ILFFBQVE7Ozs7OEJBTkY7NEJBQ1gsSUFBSSxFQUFFLE9BQU87NEJBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ3JCLE1BQU0sRUFBRSxJQUFJO3lCQUNaO3dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTttQ0FDYixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzs0QkFDakMsR0FBRyxLQUFBOzRCQUNILFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTs0QkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUNsQixDQUFDO3dCQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOzRCQUFDLE1BQU0sZ0JBQUE7d0JBQ04scUJBQU0sUUFBUSxFQUFBOztpQ0FBZCxTQUFjO3dCQUM3QixDQUFBLEtBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUEsQ0FBQyxJQUFJLFdBQUksTUFBTSxFQUFDO3dCQUNwQyx1QkFBUSxHQUFHLFNBQUssTUFBTSxHQUFDOzs7O0tBQ3ZCO0lBRUYsV0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksb0JBQUkifQ==