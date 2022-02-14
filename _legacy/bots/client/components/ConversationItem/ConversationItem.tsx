import { accent } from '../../screens/helpers/defaults';
import * as React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps } from "../../screens/helpers/types";
import { Conversation } from "../../scripts/conversations/types";


interface MyProps {
	chat: Conversation
}
interface MyState { }


export default class Conversationitem extends Component<MyProps, MyState> {

	setNativeProps(data: any) {
		// console.log("received native props")
	}

	render() {
		return (
			<View style={styles.outer}>
				<View style={styles.icon}>
					<Text style={styles.iconText}>{this.props.chat.shortName}</Text>
				</View>
				<View style={styles.inner}>
					<Text style={styles.name}>{this.props.chat.name}</Text>
					<Text style={styles.description}>{this.props.chat.description}</Text>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	outer: {
		height: 64,
		maxHeight: 64,
		padding: 8,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		alignContent: 'flex-start',
		backgroundColor: 'white'
	},
	inner: {
		flex: 2,
		paddingLeft: 8
	},
	icon: {
		height: 48,
		width: 48,
		backgroundColor: accent,
		alignContent: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		borderRadius: 24,
	},
	iconText: {
		alignSelf: 'center',
		fontWeight: '700',
		fontSize: 16
	},
	name: {
		fontSize: 16
	},
	description: {
		color: '#aaa',
		fontSize: 12
	}
})
