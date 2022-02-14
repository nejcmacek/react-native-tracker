import * as React from 'react';
import { Component } from 'react';
import { Text, WebView, WebViewHtmlSource, WebViewUriSource, StyleSheet, NativeSyntheticEvent, WebViewMessageEventData } from 'react-native';
import { Filter } from '../../services/types';
import getFilterWebViewSource from "./get-filter-html-source";


interface MyProps {
	filter: Filter
	style?: StyleSheet.Style | StyleSheet.Style[]
	injectedJavascript?: string
	onMessage?: (e: NativeSyntheticEvent<WebViewMessageEventData>) => void
}
interface MyState { }


export default class FilterDisplay extends Component<MyProps, MyState> {

	render() {
		const { filter, style, injectedJavascript, onMessage } = this.props
		const source = getFilterWebViewSource(filter)
		return <WebView
			style={style}
			source={source}
			injectedJavaScript={injectedJavascript}
			onMessage={onMessage}
		/>
	}

}
