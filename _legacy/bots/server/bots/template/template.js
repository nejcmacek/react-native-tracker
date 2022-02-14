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
var TemplateBot = (function (_super) {
    __extends(TemplateBot, _super);
    function TemplateBot() {
        return _super.call(this, 'Template Bot', 'TB', 'Template Bot Description', 'template') || this;
    }
    TemplateBot.prototype.respond = function (context) {
        return null;
        // const response: Message[] = []
        // return Promise.resolve(response)
    };
    return TemplateBot;
}(bot_1.Bot));
exports.default = TemplateBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0U7QUFHeEU7SUFBeUMsK0JBQUc7SUFFM0M7ZUFDQyxrQkFDQyxjQUFjLEVBQ2QsSUFBSSxFQUNKLDBCQUEwQixFQUMxQixVQUFVLENBQ1Y7SUFDRixDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLE9BQXdCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDWCxpQ0FBaUM7UUFDakMsbUNBQW1DO0lBQ3BDLENBQUM7SUFFRixrQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBeUMsU0FBRyxHQWlCM0MifQ==