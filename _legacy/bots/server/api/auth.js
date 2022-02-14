"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attach_1 = require("../helpers/attach");
exports.default = attach_1.default({ verb: 'post', path: '/api/auth/' }, function (context) {
    var req = context.req, resolve = context.resolve, reject = context.reject;
    console.log("Auth request:", req.body);
    var _a = req.body || {}, _b = _a.username, username = _b === void 0 ? undefined : _b, _c = _a.password, password = _c === void 0 ? undefined : _c;
    if (username === "nejc" && password === "12345")
        resolve({ token: "1234567890" });
    else
        reject("Invalid credentials.");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBdUM7QUFFdkMsa0JBQWUsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLFVBQUEsT0FBTztJQUMxRCxJQUFBLGlCQUFHLEVBQUUseUJBQU8sRUFBRSx1QkFBTSxDQUFZO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxJQUFBLG1CQUdZLEVBRmpCLGdCQUFvQixFQUFwQix5Q0FBb0IsRUFDcEIsZ0JBQW9CLEVBQXBCLHlDQUFvQixDQUNIO0lBQ2xCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksUUFBUSxLQUFLLE9BQU8sQ0FBQztRQUMvQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTtJQUNqQyxJQUFJO1FBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFDLENBQUEifQ==