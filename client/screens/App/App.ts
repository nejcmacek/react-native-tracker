import AddFilter from '../AddFilter/AddFilter';
import Identity from '../../services/auth/identity';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from "../Home/Home";
import Login from "../Login/Login";
import { EventEmitter } from "events"
import FilterDetails from "../FilterDetails/FilterDetails";
import Demo from "../Demo/Demo";

const identity = new Identity();

const Navigation = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  AddFilter: { screen: AddFilter },
  FilterDetails: { screen: FilterDetails },
  Demo: { screen: Demo }
}, {
    initialRouteParams: {
      identity,
      events: new EventEmitter(),
      globals: {}
    }
  });

AppRegistry.registerComponent('client', () => Navigation);