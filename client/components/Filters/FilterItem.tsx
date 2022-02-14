import * as defaults from '../../util/defaults';
import * as React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps, NamedStyleSheet } from "../../util/types";


interface MyProps {
	shortName?: string
	name?: string
	description?: string
	color?: string
}
interface MyState { }


export default class FilterItem extends Component<MyProps, MyState> {

	setNativeProps(data: any) {
		// console.log("received native props")
	}

	render() {
		return (
			<View style={styles.outer}>
				<View style={[styles.icon, { backgroundColor: this.props.color || defaults.ui.accent }]}>
					<Text style={styles.iconText}>{this.props.shortName}</Text>
				</View>
				<View style={styles.inner}>
					<Text style={styles.name}>{this.props.name}</Text>
					<Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create<NamedStyleSheet>({
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
