"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class TEMPLATERestServiceComponent extends index_1.RestServiceComponent {
    constructor(context, restService) {
        super(context);
        this.onCall = async (req, res, next) => {
            const action = req.query && req.query.toLowerString();
            switch (action) {
                case "TEMPLATE":
                    return await this.onAction(req, res, next);
                default:
                    throw new Error("Unknown action.");
            }
        };
        this.onAction = async (req, res, next) => {
            throw new Error("Not yet implemented.");
        };
        this.bind({
            path: "TEMPLATE"
        }, this.onCall);
    }
}
exports.default = TEMPLATERestServiceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxRjtBQUlyRixrQ0FBa0QsU0FBUSw0QkFBb0I7SUFFN0UsWUFBWSxPQUEyQixFQUFFLFdBQXdCO1FBQ2hFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQU1mLFdBQU0sR0FBaUIsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUMzQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDckQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSyxVQUFVO29CQUNkLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDM0M7b0JBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7UUFDRixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQWlCLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQTtRQWpCQSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1QsSUFBSSxFQUFFLFVBQVU7U0FDaEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEIsQ0FBQztDQWdCRDtBQXZCRCwrQ0F1QkMifQ==