"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("../utility");
var bot_1 = require("../../conversations/bot");
var RepeatBot = (function (_super) {
    __extends(RepeatBot, _super);
    function RepeatBot() {
        return _super.call(this, 'Random Integer Bot', 'RI', 'This gives you random integers in specified range.', 'random-int') || this;
    }
    RepeatBot.prototype.respond = function (context) {
        var text = context.msg.text.trim().toLowerCase();
        var response;
        if (text === "help") {
            response = [
                'Returns a random number between min (inclusive) and max (exclusive).',
                'Usage: "[min] max"',
                'Min may be omitted, default to 0.'
            ].map(utility_1.createBotMessage);
        }
        else {
            var result = process(context.msg.text);
            response = [(result === null
                    ? utility_1.createBotMessage('Invalid input. Type "help" for help.')
                    : utility_1.createBotMessage(result.toString()))];
        }
        return Promise.resolve(response);
    };
    return RepeatBot;
}(bot_1.Bot));
exports.default = RepeatBot;
function process(text) {
    var result = text
        .split(/\s+/g)
        .map(function (t) { return Number(t); });
    if (!result.every(function (t) { return !isNaN(t); }))
        return null;
    if (result.length > 2 || result.length < 1)
        return null;
    if (result.length === 1)
        result = [0].concat(result);
    var min = result[0], max = result[1];
    if (min === max)
        return min;
    if (min > max)
        (_a = { max: max, min: min }, min = _a.min, max = _a.max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    var _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhbmRvbS1pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQThDO0FBQzlDLCtDQUF3RTtBQUd4RTtJQUF1Qyw2QkFBRztJQUV6QztlQUNDLGtCQUNDLG9CQUFvQixFQUNwQixJQUFJLEVBQ0osb0RBQW9ELEVBQ3BELFlBQVksQ0FDWjtJQUNGLENBQUM7SUFFRCwyQkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFDL0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEQsSUFBSSxRQUFtQixDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsR0FBRztnQkFDVixzRUFBc0U7Z0JBQ3RFLG9CQUFvQjtnQkFDcEIsbUNBQW1DO2FBQ25DLENBQUMsR0FBRyxDQUFDLDBCQUFnQixDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDeEMsUUFBUSxHQUFHLENBQUMsQ0FDWCxNQUFNLEtBQUssSUFBSTtzQkFDWiwwQkFBZ0IsQ0FBQyxzQ0FBc0MsQ0FBQztzQkFDeEQsMEJBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQ3RDLENBQUMsQ0FBQTtRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUYsZ0JBQUM7QUFBRCxDQUFDLEFBL0JELENBQXVDLFNBQUcsR0ErQnpDOztBQUVELGlCQUFpQixJQUFZO0lBQzVCLElBQUksTUFBTSxHQUFHLElBQUk7U0FDZixLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ2IsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFBO0lBRXJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDWixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBRVosRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLENBQUMsU0FBSyxNQUFNLENBQUMsQ0FBQTtJQUVuQixJQUFBLGVBQUcsRUFBRSxlQUFHLENBQVU7SUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQztRQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUE7SUFDM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUFDLENBQUMsMkJBQTJCLEVBQXpCLFlBQUcsRUFBRSxZQUFHLENBQWtCLENBQUE7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7QUFDMUQsQ0FBQyJ9