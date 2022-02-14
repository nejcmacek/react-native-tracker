"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./endpoints");
const attach_1 = require("../util/attach");
exports.default = attach_1.default({
    path: endpoints_1.default.misc.dbtest,
    verb: 'all'
}, async (context) => {
    const { req, data } = context;
    const query = Object.assign({}, req.query, req.body);
    const fn = query.fn;
    const args = query.args || [];
    if (!fn)
        throw new Error("No function given.");
    const namespace = fn.split(/\./g);
    let parent = null;
    let handler = data.ms;
    for (const ns of namespace) {
        parent = handler;
        handler = handler[ns];
        if (!handler)
            throw new Error("Such method does not exist");
    }
    if (typeof handler !== "function")
        throw new Error("Given namespace does not resolve to a function");
    const promise = handler.apply(parent, args);
    const res = await promise;
    return res;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGJ0ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGJ0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQW9DO0FBRXBDLDJDQUFvQztBQUVwQyxrQkFBZSxnQkFBTSxDQUFPO0lBQzNCLElBQUksRUFBRSxtQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNO0lBQzNCLElBQUksRUFBRSxLQUFLO0NBQ1gsRUFBRSxLQUFLLEVBQUMsT0FBTztJQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBQzdCLE1BQU0sS0FBSyxxQkFBUSxHQUFHLENBQUMsS0FBSyxFQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQTtJQUUzQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBWSxDQUFBO0lBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFhLElBQUksRUFBRSxDQUFBO0lBRXRDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBRTlDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakMsSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFBO0lBQ3RCLElBQUksT0FBTyxHQUFRLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDMUIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLEdBQUcsT0FBTyxDQUFBO1FBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsQ0FBQztRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7SUFFbEUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUE7SUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNYLENBQUMsQ0FBQyxDQUFBIn0=