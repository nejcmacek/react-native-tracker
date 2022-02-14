import * as React from 'react'
import { Component } from 'react'
import { Text } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps, NavigationScreenCallback } from "../../util/types";


interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState { }


export default class Template extends Component<MyProps, MyState> {

	static navigationOptions: NavigationScreenCallback<DefaultScreenProps> = ({ navigation }) => ({
		title: 'Template'
	});

	render() {
		return (
			<Text>Template</Text>
		)
	}

}
