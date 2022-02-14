"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attach_1 = require("../helpers/attach");
exports.default = attach_1.default({ verb: 'get', path: '/api/conversations/' }, function (context) {
    var req = context.req, resolve = context.resolve, reject = context.reject, data = context.data;
    var br = data.botRegistry;
    resolve(br.bots);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnNhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBdUM7QUFJdkMsa0JBQWUsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsVUFBQSxPQUFPO0lBQ2xFLElBQUEsaUJBQUcsRUFBRSx5QkFBTyxFQUFFLHVCQUFNLEVBQUUsbUJBQUksQ0FBWTtJQUM5QyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBMEIsQ0FBQTtJQUMxQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQyxDQUFBIn0=