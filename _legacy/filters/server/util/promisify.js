"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promisify(fn, args) {
    if (args)
        return new Promise((resolve, reject) => {
            fn.call(this, ...args, (err, value) => {
                if (err)
                    reject(err);
                else
                    resolve(value);
            });
        });
    else
        return new Promise((resolve, reject) => {
            fn((err, value) => {
                if (err)
                    reject(err);
                else
                    resolve(value);
            });
        });
}
exports.default = promisify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsbUJBQXlCLEVBQUUsRUFBRSxJQUFLO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNSLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3JDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUs7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ1osSUFBSTtvQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNILElBQUk7UUFDSCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNyQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSztnQkFDYixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNaLElBQUk7b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsa0JBQWUsU0FBUyxDQUFDIn0=