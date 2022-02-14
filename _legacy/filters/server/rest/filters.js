"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../api/services/auth");
const util_1 = require("../mongo/util");
const filters = require("../api/services/filters");
const endpoints_1 = require("./endpoints");
const attach_1 = require("../util/attach");
// function preprocess<T>(context: RequestContext<Data>, cb: (id: Identity, filters: FilterService) => T) {
// 	const id = requireIdentity(context)
// 	return cb(id, context.data.ms.filters)
// }
exports.default = [
    attach_1.default({
        path: endpoints_1.default.filters.getAll
    }, async (context) => {
        return await filters.getAll(context.data.ms.filters);
    }),
    attach_1.default({
        path: endpoints_1.default.filters.get
    }, async (context) => {
        const id = auth_1.requireIdentity(context);
        return util_1.deleteIdField(await filters.get(id, context.data.ms.filters));
    }),
    attach_1.default({
        path: endpoints_1.default.filters.change
    }, async (context) => {
        const id = auth_1.requireIdentity(context);
        const filter = context.req.body;
        return await filters.changeFilter(id, context.data.ms.filters, util_1.deleteIdField(filter));
    }),
    attach_1.default({
        path: endpoints_1.default.filters.add
    }, async (context) => {
        const id = auth_1.requireIdentity(context);
        const filter = context.req.body;
        return await filters.addFilter(id, context.data.ms.filters, util_1.deleteIdField(filter));
    }),
    attach_1.default({
        path: endpoints_1.default.filters.remove,
        verb: "delete"
    }, async (context) => {
        const id = auth_1.requireIdentity(context);
        const title = context.req.body.title;
        return await filters.removeFilter(id, context.data.ms.filters, title);
    }),
    attach_1.default({
        path: endpoints_1.default.filters.removeAll,
        verb: "delete"
    }, async (context) => {
        const id = auth_1.requireIdentity(context);
        return await filters.removeAll(id, context.data.ms.filters);
    })
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBdUQ7QUFJdkQsd0NBQThDO0FBRTlDLG1EQUFtRDtBQUNuRCwyQ0FBb0M7QUFFcEMsMkNBQW9DO0FBRXBDLDJHQUEyRztBQUMzRyx1Q0FBdUM7QUFDdkMsMENBQTBDO0FBQzFDLElBQUk7QUFFSixrQkFBZTtJQUNkLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTtLQUM5QixFQUFFLEtBQUssRUFBQyxPQUFPO1FBQ2YsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUM7SUFDRixnQkFBTSxDQUFPO1FBQ1osSUFBSSxFQUFFLG1CQUFTLENBQUMsT0FBTyxDQUFDLEdBQUc7S0FDM0IsRUFBRSxLQUFLLEVBQUMsT0FBTztRQUNmLE1BQU0sRUFBRSxHQUFHLHNCQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkMsTUFBTSxDQUFDLG9CQUFhLENBQUMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQztJQUNGLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTtLQUM5QixFQUFFLEtBQUssRUFBQyxPQUFPO1FBQ2YsTUFBTSxFQUFFLEdBQUcsc0JBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQWMsQ0FBQTtRQUN6QyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0JBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3RGLENBQUMsQ0FBQztJQUNGLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRztLQUMzQixFQUFFLEtBQUssRUFBQyxPQUFPO1FBQ2YsTUFBTSxFQUFFLEdBQUcsc0JBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQWMsQ0FBQTtRQUN6QyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0JBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ25GLENBQUMsQ0FBQztJQUNGLGdCQUFNLENBQU87UUFDWixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUM5QixJQUFJLEVBQUUsUUFBUTtLQUNkLEVBQUUsS0FBSyxFQUFDLE9BQU87UUFDZixNQUFNLEVBQUUsR0FBRyxzQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ25DLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQWUsQ0FBQTtRQUM5QyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDdEUsQ0FBQyxDQUFDO0lBQ0YsZ0JBQU0sQ0FBTztRQUNaLElBQUksRUFBRSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTO1FBQ2pDLElBQUksRUFBRSxRQUFRO0tBQ2QsRUFBRSxLQUFLLEVBQUMsT0FBTztRQUNmLE1BQU0sRUFBRSxHQUFHLHNCQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkMsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUQsQ0FBQyxDQUFDO0NBQ0YsQ0FBQSJ9