import { NavigationActions } from "react-navigation";


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