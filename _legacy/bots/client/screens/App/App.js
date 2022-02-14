import Identity from '../../scripts/login/identity';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from "../Home/Home";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
const identity = new Identity();
const Navigation = StackNavigator({
    Login: { screen: Login },
    Home: { screen: Home },
    Chat: { screen: Chat }
}, {
    initialRouteParams: {
        identity,
        loggedOut: false
    }
});
AppRegistry.registerComponent('client', () => Navigation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLDhCQUE4QixDQUFDO0FBRXBELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLElBQUksTUFBTSxjQUFjLENBQUM7QUFFaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUVoQyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7SUFDaEMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtJQUN4QixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3RCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Q0FDdkIsRUFBRTtJQUNDLGtCQUFrQixFQUFFO1FBQ2xCLFFBQVE7UUFDUixTQUFTLEVBQUUsS0FBSztLQUNqQjtDQUNGLENBQUMsQ0FBQztBQUVMLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUMsQ0FBQyJ9