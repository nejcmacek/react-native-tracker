"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("./bots/defaults");
var identity_1 = require("./helpers/identity");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var idp = new identity_1.IdentitytProvider();
var data = {
    botRegistry: defaults_1.default
};
var context = { app: app, idp: idp, data: data };
idp.set('1234567890', {
    conversations: ['imagebot', 'myself']
});
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())
var subscribers = [
    require('./api/auth'),
    require('./api/conversations'),
    require('./api/chat'),
    require('./api/history')
];
subscribers.forEach(function (t) { return t.default.call(null, context); });
app.listen(3000, function () { return console.log("Listening..."); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUEwQztBQUUxQywrQ0FBdUQ7QUFFdkQsaUNBQW1DO0FBQ25DLHdDQUEwQztBQUUxQyxJQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQTtBQUNyQixJQUFNLEdBQUcsR0FBRyxJQUFJLDRCQUFpQixFQUFFLENBQUE7QUFDbkMsSUFBTSxJQUFJLEdBQUc7SUFDWixXQUFXLG9CQUFBO0NBQ1gsQ0FBQTtBQUNELElBQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQTtBQUVsQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtJQUNyQixhQUFhLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO0NBQ3JDLENBQUMsQ0FBQTtBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDMUIsbUNBQW1DO0FBRW5DLElBQU0sV0FBVyxHQUFHO0lBQ25CLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDckIsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0lBQzlCLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDckIsT0FBTyxDQUFDLGVBQWUsQ0FBQztDQUNrQixDQUFBO0FBRTNDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQTtBQUV2RCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFBIn0=