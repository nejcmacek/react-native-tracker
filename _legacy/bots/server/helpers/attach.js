"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attach = function (options, handler) {
    return function (context) {
        var app = context.app, idp = context.idp, data = context.data;
        var cb = function (req, res, next) {
            var resolve = function (data) { return res.send({ ok: true, data: data }); };
            var reject = function (error, data) { return res.send({ ok: false, error: error, data: data }); };
            console.log('Incoming connection:', req.url);
            var identity = idp.process(req);
            if (options.requireAuthenticated && !identity)
                reject('Not authenticated.');
            else
                try {
                    handler({ app: app, req: req, res: res, next: next, identity: identity, data: data, resolve: resolve, reject: reject });
                }
                catch (ex) {
                    reject(ex.message || ex);
                }
        };
        if (options.subscription)
            options.subscription(app, cb);
        else
            app[options.verb.toLowerCase()](options.path, cb);
    };
};
exports.default = attach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXR0YWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBeUNBLElBQU0sTUFBTSxHQUFhLFVBQUMsT0FBTyxFQUFFLE9BQU87SUFDekMsT0FBQSxVQUFDLE9BQU87UUFDQyxJQUFBLGlCQUFHLEVBQUUsaUJBQUcsRUFBRSxtQkFBSSxDQUFhO1FBQ25DLElBQU0sRUFBRSxHQUFtQixVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUN6QyxJQUFNLE9BQU8sR0FBbUIsVUFBQyxJQUFJLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQTVCLENBQTRCLENBQUE7WUFDdEUsSUFBTSxNQUFNLEdBQWtCLFVBQUMsS0FBSyxFQUFFLElBQUksSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQTtZQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM1QyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDN0IsSUFBSTtnQkFDSCxJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFBO2dCQUNsRSxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQ3pCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzlCLElBQUk7WUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkQsQ0FBQztBQXBCRCxDQW9CQyxDQUFBO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=