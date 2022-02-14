"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./endpoints");
const attach_1 = require("../util/attach");
exports.default = attach_1.default({
    path: endpoints_1.default.misc.template,
    verb: 'all'
}, async (context) => {
    const { req, data } = context;
    return "Hi there!";
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUVwQywyQ0FBb0M7QUFFcEMsa0JBQWUsZ0JBQU0sQ0FBTztJQUMzQixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUTtJQUM3QixJQUFJLEVBQUUsS0FBSztDQUNYLEVBQUUsS0FBSyxFQUFDLE9BQU87SUFDZixNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUM3QixNQUFNLENBQUMsV0FBVyxDQUFBO0FBQ25CLENBQUMsQ0FBQyxDQUFBIn0=