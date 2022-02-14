// import * as defaults from '../../util/defaults';
// import Icon from '../VectorIcons/Icon';
// import { NamedStyleSheet } from '../../util/types';
// import { default as formify, FormDataSource } from './formify';
// import endpoints from '../../util/endpoints';
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
// 			<WebView
// 				style={{ flex: 2, zIndex: 1 }}
// 				source={source}
// 			></WebView>
// 		)
// 	}

// }
