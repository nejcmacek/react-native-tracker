import Identity from '../../scripts/login/identity';
import * as React from 'react';
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