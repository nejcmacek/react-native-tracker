import * as React from 'react'
import { Component } from 'react'
import { Text } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps } from "../../screens/helpers/types";


interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState { }


export default class Template extends Component<MyProps, MyState> {

	static navigationOptions = ({ navigation }) => ({
		title: 'Template'
	});

	render() {
		return (
			<Text>Template</Text>
		)
	}

}
