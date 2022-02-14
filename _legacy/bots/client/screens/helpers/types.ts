import * as R from 'react-navigation';
import Identity from "../../scripts/login/identity";


export type NavigateActionSupl = (componentName: string, state?: R.NavigationNavigateActionCreator | Object) => boolean | R.NavigationNavigateActionCreator

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
}
