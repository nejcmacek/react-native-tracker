import * as loginInfo from './defaults';
import * as rest from '../rest/rest';
export async function getToken(username, password) {
    if (!username)
        throw new Error("Username must be given.");
    if (!password)
        throw new Error("Password must be given.");
    username = username.trim();
    if (!username)
        throw new Error("Username cannot be empty.");
    try {
        const response = await rest.post(loginInfo.loginPath, { username, password });
        return response.token;
    }
    catch (ex) {
        throw new Error(ex.message);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQztBQUV4QyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUdyQyxNQUFNLENBQUMsS0FBSyxtQkFBbUIsUUFBZ0IsRUFBRSxRQUFnQjtJQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUN6RCxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQzNELElBQUksQ0FBQztRQUNKLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBaUIsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzdGLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBO0lBQ3RCLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQztBQUNGLENBQUMifQ==