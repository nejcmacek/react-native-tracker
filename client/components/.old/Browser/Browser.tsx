// import * as defaults from '../../util/defaults';
// import Icon from '../VectorIcons/Icon';
// import { NamedStyleSheet } from '../../util/types';
// import { default as formify, FormDataSource } from './formify';
// import endpoints from '../../services/endpoints';
// import * as React from 'react';
// import * as rest from '../../services/rest/rest';
// import { Component } from 'react'
// import { Text, StatusBar, View, Navigator, WebView, WebViewUriSource, WebViewHtmlSource, StyleSheet } from 'react-native'

// interface MyProps {
// 	source?: WebViewUriSource | WebViewHtmlSource
// 	formify?: FormDataSource
// }
// interface MyState { }


// export default class Browser extends Component<MyProps, MyState> {
// 	render() {
// 		const i = new Icon()
// 		let { source, formify: frmfy } = this.props
// 		if (frmfy)
// 			source = { html: formify(frmfy), baseUrl: frmfy.uri }
// 		return (
// 			<View style={{ flex: 1 }}>
// 				<View style={styles.headerBar}>
// 					<View style={{ flex: 1, flexDirection: "row" }}>
// 						<Icon name="md-arrow-back" size={32}></Icon>
// 						<Icon name="md-refresh" size={32}></Icon>
// 						<Icon name="md-arrow-forward" size={32}></Icon>
// 					</View>
// 					<Text>Text</Text>
// 					<View>
// 						<Icon name="md-close" size={32}></Icon>
// 					</View>
// 				</View>
// 				<WebView
// 					style={{ flex: 2, zIndex: 1 }}
// 					source={source}
// 				></WebView>
// 			</View >
// 		)
// 	}

// }

// const styles = StyleSheet.create<NamedStyleSheet>({
// 	headerBar: {
// 		flex: 1,
// 		flexBasis: 48,
// 		flexGrow: 0,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 		paddingLeft: 16,
// 		paddingRight: 16,
// 		zIndex: 2,
// 		backgroundColor: defaults.ui.accent
// 	},
// 	small {
		
// 	},
// 	end: {
// 		alignSelf: "flex-end"
// 	},
// 	start: {
// 		alignSelf: "flex-start"
// 	}
// })