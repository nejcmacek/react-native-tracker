"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BotRegistry = (function () {
    function BotRegistry() {
        this.table = {};
        this.bots = [];
    }
    BotRegistry.prototype.register = function (bot) {
        if (bot.id in this.table)
            throw new Error("Bot with id \"" + bot.id + "\" already registered.");
        this.table[bot.id] = bot;
        this.bots.push(bot);
    };
    BotRegistry.prototype.get = function (id) {
        return this.table[id];
    };
    Object.defineProperty(BotRegistry.prototype, "count", {
        get: function () {
            return this.bots.length;
        },
        enumerable: true,
        configurable: true
    });
    return BotRegistry;
}());
exports.default = BotRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LXJlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm90LXJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7SUFBQTtRQUVDLFVBQUssR0FBYSxFQUFFLENBQUE7UUFDcEIsU0FBSSxHQUFVLEVBQUUsQ0FBQTtJQWlCakIsQ0FBQztJQWZBLDhCQUFRLEdBQVIsVUFBUyxHQUFRO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFnQixHQUFHLENBQUMsRUFBRSwyQkFBdUIsQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRUQseUJBQUcsR0FBSCxVQUFJLEVBQVU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN0QixDQUFDO0lBRUQsc0JBQUksOEJBQUs7YUFBVDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUN4QixDQUFDOzs7T0FBQTtJQUVGLGtCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQyJ9