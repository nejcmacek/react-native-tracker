"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function attach(options, handler) {
    return (context) => {
        const { app, idp, data } = context;
        const onRequestCallback = (req, res, next) => {
            console.log("Incoming connection", req.method, req.url, req.body);
            handler({ app, idp, data, req, res, next }).then(data => {
                if (options.raw)
                    res.send(data);
                else
                    res.send({ ok: true, data });
            }, err => {
                const error = err ? err.message || err : err;
                res.send({ ok: false, error });
            });
        };
        if (options.subscription)
            options.subscription(app, onRequestCallback);
        else
            app[(options.verb || 'post').toLowerCase()](options.path, onRequestCallback);
    };
}
exports.default = attach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXR0YWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMEJBLGdCQUF3QyxPQUFnQixFQUFFLE9BQW1CO0lBQzVFLE1BQU0sQ0FBQyxDQUFDLE9BQU87UUFDZCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFDbEMsTUFBTSxpQkFBaUIsR0FBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDZixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNmLElBQUk7b0JBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUM5QixDQUFDLEVBQUUsR0FBRztnQkFDTCxNQUFNLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFBO2dCQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQy9CLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUN4QixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBQzdDLElBQUk7WUFDSCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQzlFLENBQUMsQ0FBQTtBQUNGLENBQUM7QUFwQkQseUJBb0JDIn0=