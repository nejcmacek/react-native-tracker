"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPath = "/api/auth/";
exports.registerPath = "/api/auth/register/";
var LoginError;
(function (LoginError) {
    LoginError[LoginError["Unknown"] = 0] = "Unknown";
    LoginError[LoginError["InvalidCredentials"] = 1] = "InvalidCredentials";
})(LoginError = exports.LoginError || (exports.LoginError = {}));
