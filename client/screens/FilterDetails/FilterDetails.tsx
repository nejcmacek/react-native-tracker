import * as React from 'react';
import { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Filter } from '../../services/types';
import { DefaultScreenProps, NamedStyleSheet, SimpleNavigationComponent, NavigationScreenCallback, NavigationScreenOptions, NavigationScreenOptionsObject } from '../../util/types';
import getFilterWebViewSource from '../../components/Filters/get-filter-html-source';
import { FormInput, FormLabel, CheckBox } from '../../components/ReactNativeElements/ReactNativeElements';
import { remove, getData, changeTracking } from '../../services/filters/filters';
import * as defaults from '../../util/defaults';
import FilterDisplayModal from "../../components/Filters/FilterDisplayModal";
import Icon from "../../components/VectorIcons/Icon"
import { openLink, shareLink } from "../../util/helper";
import OptionalComp from "../../components/Optional/Optional";


interface MyScreenProps extends DefaultScreenProps {
	filter: Filter
	color: string
}
interface MyProps extends SimpleNavigationComponent<MyScreenProps> { }
interface MyState {
	loading: boolean
	modalVisible: boolean
	loadingData: boolean
	text?: string
	screenshotUrl?: string
	track: boolean
}


export default class FilterDetails extends Component<MyProps, MyState> {

	static onAction(i: number, url: string, title?: string) {
		if (i === 0)
			openLink(url)
		else if (i === 1)
			shareLink(url, title)
	}

	static navigationOptions: NavigationScreenCallback<MyScreenProps> = ({ navigation }) => {
		return {
			title: "Filter Info",
			header: (
				<Icon.ToolbarAndroid
					style={{ height: 56, backgroundColor: navigation.state.params.color, elevation: 1 }}
					title="Filter Info"
					titleColor={defaults.ui.textBlack}
					navIconName="md-arrow-back"
					iconColor={defaults.ui.textBlack}
					onIconClicked={() => navigation.goBack()}
					actions={[{
						show: "never",
						title: "Open in Browser"
					}, {
						iconName: "md-share",
						iconColor: defaults.ui.textBlack,
						show: "always",
						showWithText: true,
						title: "Share"
					}]}
					onActionSelected={i => FilterDetails.onAction(i, navigation.state.params.filter.uri, navigation.state.params.filter.title)}
				/>)
		}
	}

	state: MyState = {
		modalVisible: false,
		loading: false,
		loadingData: true,
		track: false
	}

	constructor(props) {
		super(props)
		this.loadData()
		this.state.track = this.props.navigation.state.params.filter.track
	}

	async loadData() {
		const { identity, filter } = this.props.navigation.state.params
		const res = await getData(identity, filter.title)
		this.setState({
			loadingData: false,
			text: res.text,
			screenshotUrl: res.screenshotUrl
		})
	}

	async remove() {
		const { filter, identity, events } = this.props.navigation.state.params
		this.setState({
			loading: true
		})
		try {
			await remove(identity, filter.title)
			events.emit("filter-removed", filter.title)
			this.props.navigation.goBack()
		} catch (ex) {
			Alert.alert((ex && ex.message || defaults.misc.defaultErrorMessage).toString())
			this.setState({ loading: false })
		}
	}

	async save() {
		const { filter, identity, events } = this.props.navigation.state.params
		if (filter.track === this.state.track)
			return
		this.setState({
			loading: true
		})
		try {
			await changeTracking(identity, filter.title, this.state.track)
			filter.track = this.state.track
			events.emit("filter-track-changed", filter)
			this.props.navigation.goBack()
		} catch (ex) {
			Alert.alert((ex && ex.message || defaults.misc.defaultErrorMessage).toString())
			this.setState({ loading: false })
		}
	}

	showModal(visible: boolean = true) {
		this.setState({
			modalVisible: !!visible
		})
	}

	render() {
		const { filter, color } = this.props.navigation.state.params
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<View style={{ flex: 0 }}>
					<FormLabel>Title</FormLabel>
					<FormInput
						value={filter.title}
						editable={false}
						autoCorrect={false}
					/>
					<FormLabel>Uri</FormLabel>
					<FormInput
						value={filter.uri}
						editable={false}
						autoCorrect={false}
					/>
				</View>
				<CheckBox
					title="Track Changes"
					checked={this.state.track}
					onIconPress={() => this.setState({ track: !this.state.track })}
					onPress={() => this.setState({ track: !this.state.track })}
					containerStyle={{ backgroundColor: "transparent" }}
					checkedColor={color}
				/>
				<OptionalComp
					value={this.state.loadingData}
					componentTrue={<View style={{ flex: 1 }} />}
					componentFalse={
						<View style={{ flex: 1 }}>
							<OptionalComp
								value={!!this.state.text}
								componentTrue={
									<View style={{ flex: 0 }}>
										<Text
											style={{ padding: 16 }}
										>{this.state.text}</Text>
									</View>
								}
							/>
							<View
								style={styles.frame}
								removeClippedSubviews={true}
							>
								<TouchableHighlight
									style={{ flex: 1 }}
									onPress={this.showModal.bind(this, true)}
								>
									<Image
										style={{ flex: 1, borderRadius: 6 }}
										resizeMode="cover"
										source={{ uri: this.state.screenshotUrl }}
									/>
								</TouchableHighlight>
							</View>
						</View>
					}
				/>
				<View style={{ flex: 0, padding: 16, paddingTop: 0, flexDirection: "row" }}>
					<View style={{ flex: 1, marginRight: 8 }}>
						<Button
							color={color || defaults.ui.accent}
							title="Save"
							onPress={this.save.bind(this)}
						/>
					</View>
					<View style={{ flex: 1, marginLeft: 8 }}>
						<Button
							color={color || defaults.ui.accent}
							title="Remove"
							onPress={this.remove.bind(this)}
						/>
					</View>
				</View>
				<FilterDisplayModal
					color={color}
					filter={filter}
					onRequestClose={this.showModal.bind(this, false)}
					visible={this.state.modalVisible}
				/>
			</View>
		)
	}

}

const styles = StyleSheet.create<NamedStyleSheet>({
	frame: {
		flex: 1,
		overflow: "hidden",
		margin: 16,
		borderColor: "rgba(0,0,0,0.4)",
		borderWidth: 2,
		borderRadius: 8
	}
})
