import * as React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps } from "../../screens/helpers/types";
import { Message } from "../../scripts/conversations/types";
import * as defaults from "../../screens/helpers/defaults";


interface MyProps {
	msg: Message
	flatBottom?: boolean,
	flatTop?: boolean
}
interface MyState {
	style: any
}


export default class MessageItem extends Component<MyProps, MyState> {

	constructor(props: MyProps) {
		super(props)
		this.state = this.calculateState()
	}

	calculateState(): MyState {
		const { msg, flatBottom = false, flatTop = false } = this.props
		const right = msg.sender // align right?
		return {
			style: {
				alignSelf: right ? 'flex-end' : 'flex-start',
				borderTopLeftRadius: flatTop ? 4 : 16,
				borderTopRightRadius: flatTop ? 4 : 16,
				borderBottomLeftRadius: flatBottom ? 4 : 16,
				borderBottomRightRadius: flatBottom ? 4 : 16,
				backgroundColor: msg.sender ? defaults.accent : defaults.secondary,
				marginBottom: flatBottom ? 2 : 8
			}
		}
	}

	setNativeProps(data: any) {
		// console.log("received native props")
	}

	render() {
		return (
			<View style={[styles.outer, this.state.style]}>
				<Text>{this.props.msg.text}</Text>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	outer: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8,
		paddingBottom: 8,
		backgroundColor: defaults.accent,
		margin: 8,
		marginTop: 0,
		flexGrow: 0
	}
})
