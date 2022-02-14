"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = (...types) => types.length
    ? (...values) => {
        let i = 0;
        for (const val of values) {
            if (typeof val !== types[0])
                return exports.throwInvalidArgument();
            if (i + 1 < types.length)
                i++;
        }
    }
    : (...values) => void (0);
exports.throwInvalidArgument = (message) => { throw new Error(message || "Argument type mismatch."); };
function cloneNoId(doc) {
    const clone = {};
    for (const p in doc)
        if (doc.hasOwnProperty(p) && p !== '_id')
            clone[p] = doc[p];
    return clone;
}
exports.cloneNoId = cloneNoId;
function deleteIdField(doc) {
    delete doc._id;
    return doc;
}
exports.deleteIdField = deleteIdField;
function idToString(id) {
    return typeof id === "string"
        ? id
        : id.toHexString();
}
exports.idToString = idToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFYSxRQUFBLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBZSxLQUFLLEtBQUssQ0FBQyxNQUFNO01BQ3pELENBQUMsR0FBRyxNQUFhO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsNEJBQW9CLEVBQUUsQ0FBQTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLENBQUMsRUFBRSxDQUFBO1FBQ0wsQ0FBQztJQUNGLENBQUM7TUFDQyxDQUFDLEdBQUcsTUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVwQixRQUFBLG9CQUFvQixHQUFHLENBQUMsT0FBZ0IsT0FBYyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO0FBRTFILG1CQUE0QyxHQUFzQjtJQUNqRSxNQUFNLEtBQUssR0FBUSxFQUFFLENBQUE7SUFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUN4QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFDYixDQUFDO0FBTkQsOEJBTUM7QUFFRCx1QkFBaUMsR0FBMEI7SUFDMUQsT0FBUSxHQUF5QixDQUFDLEdBQUcsQ0FBQTtJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFBO0FBQ1gsQ0FBQztBQUhELHNDQUdDO0FBRUQsb0JBQTJCLEVBQXFCO0lBQy9DLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRO1VBQzFCLEVBQUU7VUFDRixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDcEIsQ0FBQztBQUpELGdDQUlDIn0=