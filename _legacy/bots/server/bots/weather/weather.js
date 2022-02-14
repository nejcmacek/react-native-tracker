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
var weather = require("weather-js");
var WeatherBot = (function (_super) {
    __extends(WeatherBot, _super);
    function WeatherBot() {
        return _super.call(this, 'Weather Bot', 'WB', 'What\'s the weather like?', 'weather') || this;
    }
    WeatherBot.prototype.respond = function (context) {
        var query = context.msg.text;
        return new Promise(function (resolve, reject) {
            var response;
            weather.find({ search: query, degreeType: 'C' }, function (err, result) {
                if (err) {
                    response = [
                        utility_1.createBotMessage('Unable to retrieve weather information.')
                    ];
                }
                else {
                    try {
                        var _a = result[0], location = _a.location, current = _a.current, forecast = _a.forecast;
                        var tomorrow = forecast[0];
                        response = [
                            'Temperature: ' + current.temperature + '°C',
                            'Weather: ' + current.skytext,
                            'Tomorrow: ' + tomorrow.skytextday
                        ].map(utility_1.createBotMessage);
                    }
                    catch (ex) {
                        response = [
                            utility_1.createBotMessage('Unable to retrieve weather information.')
                        ];
                    }
                }
                resolve(response);
            });
        });
    };
    return WeatherBot;
}(bot_1.Bot));
exports.default = WeatherBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYXRoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQThDO0FBQzlDLCtDQUF3RTtBQUN4RSxvQ0FBcUM7QUFHckM7SUFBd0MsOEJBQUc7SUFFMUM7ZUFDQyxrQkFDQyxhQUFhLEVBQ2IsSUFBSSxFQUNKLDJCQUEyQixFQUMzQixTQUFTLENBQ1Q7SUFDRixDQUFDO0lBRUQsNEJBQU8sR0FBUCxVQUFRLE9BQXdCO1FBQy9CLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLElBQUksUUFBbUIsQ0FBQztZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsTUFBTTtnQkFDckUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDVCxRQUFRLEdBQUc7d0JBQ1YsMEJBQWdCLENBQUMseUNBQXlDLENBQUM7cUJBQzNELENBQUE7Z0JBQ0YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUM7d0JBQ0UsSUFBQSxjQUEyQyxFQUF6QyxzQkFBUSxFQUFFLG9CQUFPLEVBQUUsc0JBQVEsQ0FBYzt3QkFDakQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUM1QixRQUFRLEdBQUc7NEJBQ1YsZUFBZSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSTs0QkFDNUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPOzRCQUM3QixZQUFZLEdBQUcsUUFBUSxDQUFDLFVBQVU7eUJBQ2xDLENBQUMsR0FBRyxDQUFDLDBCQUFnQixDQUFDLENBQUE7b0JBQ3hCLENBQUM7b0JBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDYixRQUFRLEdBQUc7NEJBQ1YsMEJBQWdCLENBQUMseUNBQXlDLENBQUM7eUJBQzNELENBQUE7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO2dCQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVGLGlCQUFDO0FBQUQsQ0FBQyxBQXhDRCxDQUF3QyxTQUFHLEdBd0MxQyJ9