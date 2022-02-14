import * as R from 'react-navigation';
import Identity from "../services/auth/identity";
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import { EventEmitter } from "events";

export type NavigateActionSupl = (componentName: string, state?: Object, action?: Function) => void

export type NavigationScreenCallback<T = {}> = (props: SimpleNavigationComponent<T>) => R.NavigationScreenOptions

export type NavigationScreenOptionsObject = R.NavigationScreenOptions

export type NavigationScreenOptions<T = {}> = R.NavigationScreenOptions | NavigationScreenCallback<T>

export interface SimpleNavigationComponent<T> {
	screenProps: any
	navigation: {
		dispatch: any
		goBack: R.NavigationBackActionCreator
		navigate: NavigateActionSupl
		setParams: R.NavigationSetParamsActionCreator
		state: {
			key: string
			routeName: string,
			params: T,
		},
	}
}

export interface DefaultScreenProps {
	identity: Identity
	events: EventEmitter,
	globals: {
		state?: any
	}
}

export interface NamedStyleSheet extends StyleSheet.NamedStyles<{}> {
	[key: string]: StyleSheet.Style
}

export interface ComponentType<T> extends Component<T, {}> {
	new (): ComponentType<T>
}
