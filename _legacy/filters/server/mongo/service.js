"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_handler_1 = require("./event-handler");
const filters_1 = require("./services/filters");
const auth_1 = require("./services/auth");
class MongoService {
    constructor(db) {
        this.db = db;
        this.eh = new event_handler_1.default();
        this.auth = new auth_1.default(this.db, this.eh);
        this.filters = new filters_1.default(this.db, this.eh);
    }
}
exports.default = MongoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBMkM7QUFDM0MsZ0RBQStDO0FBQy9DLDBDQUEwQztBQUcxQztJQUlDLFlBQW9CLEVBQU07UUFBTixPQUFFLEdBQUYsRUFBRSxDQUFJO1FBRmxCLE9BQUUsR0FBaUIsSUFBSSx1QkFBWSxFQUFFLENBQUE7UUFJN0MsU0FBSSxHQUFHLElBQUksY0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3hDLFlBQU8sR0FBRyxJQUFJLGlCQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFIZixDQUFDO0NBSy9CO0FBVEQsK0JBU0MifQ==