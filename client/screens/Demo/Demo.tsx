import * as React from 'react'
import { Component } from 'react'
import { Text, View } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps, NavigationScreenCallback } from "../../util/types";


interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState { }


export default class Demo extends Component<MyProps, MyState> {

	static navigationOptions: NavigationScreenCallback<DefaultScreenProps> = ({ navigation }) => ({
		title: 'Demo'
	});

	render() {
		return (
			<View style={{ backgroundColor: "red" }}>
				<Text>Demo</Text>
			</View>
		)
	}

}
