import FilterSiteSelect from '../../components/Filters/FilterSiteSelect';
import { add } from '../../services/filters/filters';
import { Filter } from '../../services/types';
import * as defaults from '../../util/defaults';
import Icon from '../../components/VectorIcons/Icon';
import * as React from 'react';
import { Component } from 'react'
import { Text, View, WebView, StyleSheet, TouchableHighlight, TextInput, NavState, Modal, Button, ToolbarAndroid, Alert } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps, NamedStyleSheet, NavigationScreenCallback } from "../../util/types";
import { FormLabel, FormInput, CheckBox } from "../../components/ReactNativeElements/ReactNativeElements";
import FAB from '../../components/SiDevesh/FAB'
import FilterContentSelectModal, { FilterData } from "../../components/Filters/FilterContentSelectModal";

interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState {
	title: string
	filter: Filter
	resourceModalVisible: boolean
	loading: boolean
	searchUri: string
	filterData?: FilterData
	contentModalVisible: boolean
	trackFilter: boolean
}


const defaultAddress = "https://www.google.com/"

export default class AddFilter extends Component<MyProps, MyState> {

	webView: WebView

	static navigationOptions: NavigationScreenCallback<DefaultScreenProps> = ({ navigation }) => ({
		title: 'Add Filter'
	});

	state: MyState = {
		title: "",
		filter: null,
		resourceModalVisible: false,
		loading: false,
		searchUri: null,
		contentModalVisible: false,
		trackFilter: false
	}

	showResourceModal(visible?: boolean) {
		if (visible === undefined) visible = !this.state.resourceModalVisible
		if (visible)
			this.setState({
				resourceModalVisible: true,
				searchUri: this.state.title.trim() || null
			})
		else {
			let { filter, title } = this.state
			if (filter) {
				if (!title) title = filter.title || ""
				this.setState({
					resourceModalVisible: false,
					title: title.trim(),
					filter
				})
			} else {
				this.setState({
					resourceModalVisible: false,
					filter: null
				})
			}
		}
	}

	onFilterSelected(filter: Filter) {
		this.setState({
			filter: filter || null,
			title: this.state.title || filter.title,
			resourceModalVisible: false
		})
	}

	async save() {
		let { filter, title, loading, filterData } = this.state

		if (loading) return
		if (!(filter && filter.uri && title && title.trim())) {
			Alert.alert("Invalid data. Please review your input.")
			return
		}
		filter = { ...filter }
		filter.title = title
		if (filterData)
			filter.path = filterData.path || null
		filter.track = !!this.state.trackFilter

		this.setState({ loading: true })
		try {
			// Alert.alert("saving...")
			await add(this.props.navigation.state.params.identity, filter)
			const { goBack, state } = this.props.navigation
			state.params.events.emit("filter-added", filter)
			goBack()
		} catch (ex) {
			Alert.alert((ex && ex.message || defaults.misc.defaultErrorMessage).toString())
			this.setState({ loading: false })
		}
	}

	onContentDialogClosing(data: FilterData) {
		if (data)
			this.setState({
				filterData: data,
				contentModalVisible: false
			})
		else
			this.setState({
				contentModalVisible: false
			})
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				{/*<ToolbarAndroid
					title="Add Filter"
					style={{ backgroundColor: defaults.ui.accent, height: 56 }}
				/>*/}
				<View style={{ flex: 1 }}>
					<FormLabel>Title</FormLabel>
					<FormInput
						editable={!this.state.loading}
						placeholder="Enter filter name"
						value={this.state.title}
						onChangeText={text => this.setState({ title: text })}
						underlineColorAndroid={defaults.ui.accent}
					/>
					<FormLabel>Resouce</FormLabel>
					<View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
						<View style={{ flex: 1 }}>
							<FormInput
								containerStyle={{ backgroundColor: "transparent" }}
								editable={false}
								placeholder="Not selected"
								value={this.state.filter && this.state.filter.uri || null}
								underlineColorAndroid={defaults.ui.accent}
							/>
						</View>
						<View style={{ flex: 0, marginRight: 16 }}>
							<Button
								onPress={this.showResourceModal.bind(this)}
								title="Select"
								color={defaults.ui.accent}
							/>
						</View>
					</View>
					<FormLabel>Filter Contents</FormLabel>
					<View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
						<View style={{ flex: 1 }}>
							<FormInput
								containerStyle={{ backgroundColor: "transparent" }}
								editable={false}
								placeholder="Not selected"
								value={this.state.filterData ? this.state.filterData.text || "(Empty)" : null}
								underlineColorAndroid={defaults.ui.accent}
							/>
						</View>
						<View style={{ flex: 0, marginRight: 16 }}>
							<Button
								onPress={() => this.setState({ contentModalVisible: true })}
								title="Select"
								disabled={!this.state.filter}
								color={defaults.ui.accent}
							/>
						</View>
					</View>
					<CheckBox
						title="Track Changes"
						checked={this.state.trackFilter}
						onIconPress={() => this.setState({ trackFilter: !this.state.trackFilter })}
						onPress={() => this.setState({ trackFilter: !this.state.trackFilter })}
						containerStyle={{ backgroundColor: "transparent" }}
						checkedColor={defaults.ui.accent}
					/>
				</View>
				<View style={{ padding: 16 }}>
					<Button
						title="Save"
						onPress={this.save.bind(this)}
						color={defaults.ui.accent}
					/>
				</View>
				<Modal
					visible={this.state.resourceModalVisible}
					animationType="slide"
					onRequestClose={this.showResourceModal.bind(this, false)}
				>
					<View style={{ flex: 1, flexDirection: "column" }}					>
						<Icon.ToolbarAndroid
							navIconName="md-arrow-back"
							title="Select filter"
							onIconClicked={this.showResourceModal.bind(this, false)}
							style={{ height: 56, backgroundColor: defaults.ui.accent }}
						/>
						<View style={{ flex: 1 }}>
							<FilterSiteSelect
								onFiltered={filter => this.onFilterSelected(filter)}
								showFab={true}
								searchUri={this.state.searchUri}
								autoDetectFormSubmission={false}
								showFormSubmissionToast={true}
							/>
						</View>
					</View>
				</Modal>
				<FilterContentSelectModal
					filter={this.state.filter}
					visible={this.state.contentModalVisible}
					onCloseRequest={this.onContentDialogClosing.bind(this)}
				/>
			</View >
			//	{/*searchUri="https://feri.um.si/urniki5/groups.php?page=normal"*/}
			// <View style={{ flex: 1, alignItems: "stretch" }}>
			// 	<View style={{ backgroundColor: defaults.ui.accent }}>
			// 		<ToolbarAndroid
			// 			style={{ height: 56 }}
			// 			title="Final steps"
			// 		></ToolbarAndroid>
			// 	</View>
			// 	<View style={{ padding: 16 }}>
			// 		<Text>Title</Text>
			// 		<TextInput
			// 			value={this.state.title}
			// 			onChangeText={title => this.setState({ title })}
			// 			placeholder="Title"
			// 			editable={!this.state.submitBtnDisabled}
			// 		></TextInput>
			// 		<Text>When to be notified?</Text>
			// 		<RadioForm
			// 			radio_props={[
			// 				{ label: "Any Change", value: 0 },
			// 				{ label: "Major Change", value: 1 },
			// 				{ label: "Smart Change", value: 2 }
			// 			]}
			// 			onPress={(value) => this.state.radioSelect}
			// 		/>
			// 		<Button
			// 			title={this.state.submitBtnTitle}
			// 			onPress={this.submit.bind(this)}
			// 			disabled={this.state.submitBtnDisabled}
			// 		></Button>
			// 	</View>
			// </View>
		)
	}

}

const styles = StyleSheet.create<NamedStyleSheet>({
	inputFieldBlock: {
		paddingTop: 4,
		paddingBottom: 4
	},
	inputFieldRow: {
		flexDirection: "row",
		alignItems: "baseline",
		alignContent: "stretch"
	},
	inputFieldStretch: {
		flex: 1
	},
	inputFieldNoStretch: {
		flex: 0
	}
})
