import { Filter } from '../../services/types';
import Icon from '../VectorIcons/Icon';
import FAB from '../SiDevesh/FAB';
import SnackBar from '../SiDevesh/SnackBar';
import * as React from 'react';
import { Component } from 'react'
import { Text, View, ToolbarAndroid, TextInput, Button, TouchableHighlight, WebView, StyleSheet, NavState, Modal, NativeSyntheticEvent, WebViewMessageEventData, Alert } from 'react-native'
import * as defaults from '../../util/defaults';
import urlify from "./urlify";
import { NamedStyleSheet } from "../../util/types";
import injectedJs from "./inject-form-submit-listener"


interface MyProps {
	searchUri?: string
	showFab?: boolean
	onFiltered: (filter: Filter) => void
	autoDetectFormSubmission?: boolean
	showFormSubmissionToast?: boolean
}
interface MyState {
	siteTitle: string
	urlBarText: string
	webViewUri: string
	actualUri: string
	toastVisible: boolean
	snackbarOffset: number
}
interface WebViewInterceptMessage {
	message: string
	data: {
		method: string
		action: string
		data: Object
	}
}

const defaultAddress = "https://www.google.com/"

export default class FilterSiteSelect extends Component<MyProps, MyState> {

	private homeUrl: string
	private lastToastTimeout: number
	private webView: WebView
	private capturedFilter: Filter

	constructor(props: MyProps) {
		super(props)
		this.homeUrl = urlify(props.searchUri || defaultAddress)
		this.state = {
			siteTitle: "Loading...",
			urlBarText: "Loading...",
			webViewUri: this.homeUrl,
			actualUri: this.homeUrl,
			toastVisible: false,
			snackbarOffset: 0
		}
	}

	onGoBack() {
		this.webView.goBack()
	}

	onReload() {
		this.webView.reload()
	}

	onGoForward() {
		this.webView.goForward()
	}

	onTextChange(urlBarText: string) {
		this.setState({ urlBarText })
	}

	onUrlSubmit() {
		const val = urlify(this.state.urlBarText)
		this.setState({
			webViewUri: val,
			actualUri: val
		})
	}

	onHome() {
		this.setState({
			webViewUri: this.homeUrl,
			actualUri: this.homeUrl,
			urlBarText: this.homeUrl
		})
	}

	onNavChange(data: NavState) {
		this.setState({
			urlBarText: data.url,
			actualUri: data.url,
			siteTitle: data.title
		})
	}

	onConfirm() {
		this.props.onFiltered({
			title: this.state.siteTitle,
			body: null,
			method: "GET",
			track: false,
			uri: this.state.actualUri
		})
	}

	componentWillUnmount() {
		if (this.lastToastTimeout)
			clearTimeout(this.lastToastTimeout)
		this.lastToastTimeout = null
	}

	showToast() {
		this.setState({
			toastVisible: true
		})
		if (this.lastToastTimeout)
			clearTimeout(this.lastToastTimeout)
		const timerId: any = setTimeout(() => {
			this.setState({ toastVisible: false })
			this.lastToastTimeout = null
		}, 5000)
		this.lastToastTimeout = timerId // needed for conversion purposes
	}

	static getFilterFromData(data: string) {
		try {
			const obj: WebViewInterceptMessage = JSON.parse(data)
			if (obj.message !== "form-submit-intercept")
				return null
			return obj.data
		} catch (ex) {
			return null
		}
	}

	onMessage(data: NativeSyntheticEvent<WebViewMessageEventData>) {
		const { autoDetectFormSubmission: detect, showFormSubmissionToast: toast } = this.props
		const body = FilterSiteSelect.getFilterFromData(data.nativeEvent.data)
		if (!body || !(detect || toast)) return
		const filter = {
			title: this.state.siteTitle,
			uri: body.action,
			method: body.method,
			body: body.data,
			track: false
		}
		if (detect) {
			try {
				this.props.onFiltered(filter)
			} catch (ex) { } // some other postMessage window call, do nothing
		} else { // toast
			this.capturedFilter = filter
			this.showToast()
		}
	}

	sendCapturedForm() {
		if (this.capturedFilter) // check just in case
			this.props.onFiltered(this.capturedFilter)
		else
			Alert.alert("Error", "A banana ate a pyramidically shaped flying saucer and therefore, we cannot perform this action.")
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<View style={styles.headerBar}>
					<View style={styles.left}>
						<TouchableHighlight onPress={this.onGoBack.bind(this)} style={styles.icon} underlayColor="transparent">
							<Icon name="md-arrow-back" size={24} />
						</TouchableHighlight>
						<TouchableHighlight onPress={this.onGoForward.bind(this)} style={styles.icon} underlayColor="transparent">
							<Icon name="md-arrow-forward" size={24} />
						</TouchableHighlight>
						<TouchableHighlight onPress={this.onReload.bind(this)} style={styles.icon} underlayColor="transparent">
							<View>
								<Icon name="md-refresh" size={24} />
							</View>
						</TouchableHighlight>
					</View>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						blurOnSubmit={true}
						style={{ flex: 1 }}
						onChangeText={text => this.onTextChange(text)}
						value={this.state.urlBarText}
						keyboardType="url"
						onSubmitEditing={this.onUrlSubmit.bind(this)}
						placeholder="Enter URL address"
						returnKeyType="send"
						selectTextOnFocus={true}
					/>
					<TouchableHighlight onPress={this.onHome.bind(this)} style={styles.icon} underlayColor="transparent">
						<Icon name="md-home" size={24} />
					</TouchableHighlight>
				</View>
				<WebView
					ref={(ref: any) => { this.webView = ref }}
					source={{ uri: this.state.webViewUri }}
					onNavigationStateChange={this.onNavChange.bind(this)}
					startInLoadingState={true}
					injectedJavaScript={injectedJs(!this.props.autoDetectFormSubmission)}
					onMessage={this.onMessage.bind(this)}
				/>
				<SnackBar
					textMessage="Capture Form Submission?"
					actionText="CAPTURE"
					accentColor={defaults.ui.accent}
					visible={this.state.toastVisible}
					actionHandler={this.sendCapturedForm.bind(this)}
					distanceCallback={snackbarOffset => this.setState({ snackbarOffset })}
				/>
				<FAB
					buttonColor={defaults.ui.accent}
					visible={this.props.showFab}
					iconTextComponent={(<Icon name="md-send"></Icon>)}
					onClickAction={this.onConfirm.bind(this)}
					snackOffset={this.state.snackbarOffset}
				></FAB>
			</View>
		)
	}

}

const styles = StyleSheet.create<NamedStyleSheet>({
	headerBar: {
		flex: 0,
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 8,
		paddingRight: 8,
		flexBasis: 48,
		shadowColor: "#fff",
		shadowRadius: 4
	},
	left: {
		flexDirection: "row",
		alignContent: "center"
	},
	right: {
		flex: 0
	},
	icon: {
		padding: 8
	}
})
