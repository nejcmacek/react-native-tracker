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
var bot_1 = require("../../conversations/bot");
var RepeatBot = (function (_super) {
    __extends(RepeatBot, _super);
    function RepeatBot() {
        return _super.call(this, 'Repeat Bot', 'RB', 'This bot repeats everything you say.', 'repeat') || this;
    }
    RepeatBot.prototype.respond = function (context) {
        var response = [{
                sender: false,
                text: context.msg.text,
                timestamp: Date.now()
            }];
        return Promise.resolve(response);
    };
    return RepeatBot;
}(bot_1.Bot));
exports.default = RepeatBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwZWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF3RTtBQUd4RTtJQUF1Qyw2QkFBRztJQUV6QztlQUNDLGtCQUNDLFlBQVksRUFDWixJQUFJLEVBQ0osc0NBQXNDLEVBQ3RDLFFBQVEsQ0FDUjtJQUNGLENBQUM7SUFFRCwyQkFBTyxHQUFQLFVBQVEsT0FBd0I7UUFDL0IsSUFBTSxRQUFRLEdBQWMsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtnQkFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7YUFDckIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVGLGdCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUF1QyxTQUFHLEdBb0J6QyJ9