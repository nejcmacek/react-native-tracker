import * as React from 'react'
import * as defaults from '../../util/defaults'
import Icon from '../VectorIcons/Icon'
import FAB from '../SiDevesh/FAB'
import { Component } from 'react'
import { Text, Modal, View, Alert, WebView, NativeSyntheticEvent, WebViewMessageEventData } from 'react-native'
import { Filter } from "../../services/types";
import FilterDisplay from "./FilterDisplay";
import injectedJs from "./inject-element-selection"


interface MyProps {
	onCloseRequest: (filterData: FilterData) => void
	visible: boolean
	color?: string
	filter: Filter
}
interface MyState { }

export interface FilterData {
	text: string
	path: string
	rect: {
		left: number
		top: number
		width: number
		height: number
	}
}

interface FilterDataEvent {
	message: string
	data: FilterData
}

export default class FilterContentSelectModal extends Component<MyProps, MyState> {

	data: FilterData

	requestClose(confirm: boolean) {
		this.props.onCloseRequest(confirm
			? this.data || null
			: null
		)
	}

	showHelp() {
		Alert.alert("Instructions", "Select an element on the page by clicking onto it.")
	}

	onMessage(e: NativeSyntheticEvent<WebViewMessageEventData>) {
		try {
			const data = JSON.parse(e.nativeEvent.data) as FilterDataEvent
			if (data.message !== "element-selection-event")
				return
			this.data = data.data
		} catch (ex) {
			// something else we don't care about
		}
	}

	render() {
		const { visible, onCloseRequest, color, filter, } = this.props
		if (!filter)
			return null
		return (
			<Modal
				visible={visible}
				onRequestClose={this.requestClose.bind(this, false)}
			>
				<Icon.ToolbarAndroid
					navIconName="md-arrow-back"
					title="Select an element"
					onIconClicked={this.requestClose.bind(this, false)}
					style={{ height: 56, backgroundColor: color || defaults.ui.accent }}
					actions={[{
						iconName: "md-help",
						title: "Help",
						show: "ifRoom"
					}]}
					onActionSelected={this.showHelp.bind(this)}
				/>
				<View style={{ flex: 1 }}>
					<FilterDisplay
						filter={filter}
						injectedJavascript={injectedJs}
						onMessage={this.onMessage.bind(this)}
					/>
				</View>
				<FAB
					buttonColor={color || defaults.ui.accent}
					visible={true}
					iconTextComponent={(<Icon name="md-send" />)}
					onClickAction={this.requestClose.bind(this, true)}
				/>
			</Modal>
		)
	}

}
