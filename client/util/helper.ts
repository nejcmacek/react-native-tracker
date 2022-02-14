import { NavigationActions } from "react-navigation";
import { Component } from "react"
import { Linking, Alert, Share } from "react-native"
import { ComponentType, DefaultScreenProps, SimpleNavigationComponent } from './types';
import { misc, ui } from "./defaults";


export function resetNavigation(navigation: any, componentName: string, params?: Object) {
	const resetAction = NavigationActions.reset({
		index: 0,
		actions: [
			NavigationActions.navigate({ routeName: componentName })
		],
	})
	navigation.dispatch(resetAction)
	if (params)
		navigation.setParams(params)
}

export function navigateTo(component: Component<SimpleNavigationComponent<DefaultScreenProps>, any>, whereTo: string, obj?: Object) {
	const { navigate, state } = component.props.navigation
	const params = obj
		? { identity: state.params.identity, ...obj }
		: { identity: state.params.identity }
	navigate(whereTo, params)
}

export function getDefaultNavigationParams(component: Component<SimpleNavigationComponent<DefaultScreenProps>, any>): DefaultScreenProps {
	// const { identity, globals } = component.props.navigation.state.params
	// return { identity, globals }
	return { ...component.props.navigation.state.params }
}

export function alertError(ex: any, title: string = "An Error has Occurred") {
	Alert.alert(title, ex.message && ex || misc.defaultErrorMessage)
}

export async function openLink(url: string) {
	if (await Linking.canOpenURL(url)) {
		try {
			await Linking.openURL(url)
		} catch (ex) {
			alertError(ex)
		}
	} else
		Alert.alert("Cannot open link", "No application is configured to open this link.")
}

export async function shareLink(url: string, title: string) {
	try {
		await Share.share({
			title: "Share " + title,
			message: url
		}, {
				tintColor: ui.accent,
				dialogTitle: "Share " + title
			})
	} catch (ex) {
		alertError(ex)
	}
}