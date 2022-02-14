"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./endpoints");
const attach_1 = require("../util/attach");
const auth = require("../api/services/auth");
exports.default = [
    attach_1.default({
        path: endpoints_1.default.auth.login,
        verb: 'post'
    }, async (context) => {
        const id = await auth.login(context);
        if (id)
            return {
                token: id.token,
                displayName: id.user.displayName
            };
        else
            throw new Error("Invalid credentials.");
    }),
    attach_1.default({
        path: endpoints_1.default.auth.logout,
        verb: 'post'
    }, async (context) => {
        auth.logout(context);
    })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0M7QUFFcEMsMkNBQW9DO0FBQ3BDLDZDQUE2QztBQUU3QyxrQkFBZTtJQUNkLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSztRQUMxQixJQUFJLEVBQUUsTUFBTTtLQUNaLEVBQUUsS0FBSyxFQUFDLE9BQU87UUFDZixNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNkLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSztnQkFDZixXQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQ2hDLENBQUE7UUFDRCxJQUFJO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQztJQUNGLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUMzQixJQUFJLEVBQUUsTUFBTTtLQUNaLEVBQUUsS0FBSyxFQUFDLE9BQU87UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLENBQUMsQ0FBQztDQUNGLENBQUEifQ==