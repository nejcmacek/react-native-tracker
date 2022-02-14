"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_registry_1 = require("./bot-registry");
var botRegistry = new bot_registry_1.default();
var bots = [
    require('./repeat/repeat'),
    require('./random-int/random-int'),
    require('./weather/weather')
];
bots
    .map(function (t) { return new t.default(); })
    .forEach(botRegistry.register.bind(botRegistry));
exports.default = botRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUF5QztBQUl6QyxJQUFNLFdBQVcsR0FBRyxJQUFJLHNCQUFXLEVBQUUsQ0FBQztBQUV0QyxJQUFNLElBQUksR0FBRztJQUNaLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUMxQixPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDbEMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0NBQ1MsQ0FBQTtBQUV0QyxJQUFJO0tBQ0YsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQWYsQ0FBZSxDQUFDO0tBQ3pCLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0FBRWpELGtCQUFlLFdBQVcsQ0FBQyJ9