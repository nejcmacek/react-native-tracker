import { Filter } from '../../services/types';
import { openLink, shareLink } from '../../util/helper';
import IconToolbarAndroid from '../VectorIcons/AndroidToolbar';
import { default as Icon, IconNames } from '../VectorIcons/Icon';
import FilterDisplay from './FilterDisplay';
import getFilterWebViewSource from './get-filter-html-source';
import * as defaults from '../../util/defaults'
import * as React from 'react';
import { Component } from 'react';
import { Alert, Linking, Modal, Share, Text, View, WebView, WebViewProperties } from 'react-native';


interface MyProps {
	filter: Filter
	visible: boolean,
	onRequestClose: () => void
	onShow?: () => void
	color?: string
}
interface MyState { }


export default class FilterDisplayModal extends Component<MyProps, MyState> {

	webView: Component<WebViewProperties, React.ComponentState> = null
	url: string

	share() {
		const { filter } = this.props
		Share.share({
			title: filter.title,
			url: filter.uri
		}, {
				dialogTitle: "Share This Site",
				tintColor: defaults.ui.accent
			})
	}

	async onActionSelected(action: number) {
		const { filter } = this.props
		if (action === 0)
			openLink(this.url)
		else if (action === 1)
			shareLink(this.url, filter.title)
	}

	render() {
		const { onRequestClose, visible, onShow, filter, color } = this.props
		const source = getFilterWebViewSource(filter)
		return (
			<Modal
				onRequestClose={onRequestClose}
				visible={visible}
				animationType="slide"
				onShow={onShow}
			>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Icon.ToolbarAndroid
						style={{ height: 56, backgroundColor: color || defaults.ui.accent }}
						navIconName="md-arrow-back"
						iconColor="rgba(0,0,0,.6)"
						onIconClicked={onRequestClose.bind(null)}
						actions={[{
							iconName: "md-open",
							iconColor: "rgba(0,0,0,.6)",
							show: "never",
							showWithText: true,
							title: "Open in browser"
						}, {
							iconName: "md-share",
							iconColor: "rgba(0,0,0,.6)",
							show: "always",
							showWithText: true,
							title: "Share"
						}]}
						onActionSelected={i => this.onActionSelected(i)}
						title="Preview"
						titleColor="rgba(0,0,0,.6)"
					/>
					<WebView
						style={{ flex: 1 }}
						ref={wv => this.webView = wv}
						onNavigationStateChange={s => this.url = s.url}
						source={source}
					/>
				</View>
			</Modal>
		)
	}

}
