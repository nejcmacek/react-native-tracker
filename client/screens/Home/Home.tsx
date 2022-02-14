import FAB from '../../components/SiDevesh/FAB';
import SnackBar from '../../components/SiDevesh/SnackBar';
import FilterItem from '../../components/Filters/FilterItem';
import { Filter } from '../../services/types';
import * as filters from '../../services/filters/filters';
import * as defaults from '../../util/defaults'
import * as React from 'react';
import { Component } from 'react'
import { View, Text, ListView, ListViewDataSource, TouchableHighlight, Modal, Alert } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps, NavigationScreenCallback } from "../../util/types";
import { navigateTo, resetNavigation, getDefaultNavigationParams } from '../../util/helper';
import ColorMapping from "./color-mapping";

interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState {
	loading: boolean
	fs: Filter[]
	fslvds: ListViewDataSource
	error: string
	fabIndent: number
	snackBarVisible: boolean
	titles?: string[]
}

interface FilterDateMapping {
	[key: string]: number
}

export default class Home extends Component<MyProps, MyState> {

	colors = new ColorMapping()
	listeners: Filter[]
	timeoutToken: number
	listening: boolean = false
	filterDates: FilterDateMapping = {}

	static navigationOptions: NavigationScreenCallback<DefaultScreenProps> = ({ navigation }) => ({
		title: navigation.state.params.identity.getDisplayName()
	})

	_root: any

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			fs: null,
			fslvds: null,
			error: null,
			fabIndent: 0,
			snackBarVisible: false
		}
		this.loadData()
		this.props.navigation.state.params.events.on("filter-added", this.load.bind(this))
		this.props.navigation.state.params.events.on("filter-removed", this.load.bind(this))
		this.props.navigation.state.params.events.on("filter-track-changed", filter => this.managerListener(filter))
		this.enableListener()
	}

	private async loadData() {
		this.colors.clear()
		try {
			const fs = await filters.get(this.props.navigation.state.params.identity)
			this.listeners = fs.filter(t => t.track)
			const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
			const fslvds = ds.cloneWithRows(fs)
			this.setState({
				fs,
				fslvds,
				loading: false,
				error: null
			})
		} catch (ex) {
			this.setState({
				loading: false,
				error: ex.message || ex
			})
		}
	}

	async load() {
		this.setState({ loading: true, fs: null, fslvds: null, error: null })
		this.loadData()
	}

	enableListener() {
		if (this.listening) return
		this.listening = true
		this.onTick()
	}

	disableListener() {
		clearTimeout(this.timeoutToken)
		this.listening = false
	}

	componentWillMount() {
		this.timeoutToken = setTimeout(this.enableListener.bind(this), 10 * 1000)
	}

	componentWillUnmount() {
		this.disableListener()
	}

	async onTick() {
		try {
			await this.checkIfNew()
		} catch (ex) { }
		if (this.listening)
			this.timeoutToken = setTimeout(this.onTick.bind(this), 10 * 1000)
	}

	async	checkIfNew() {
		const id = this.props.navigation.state.params.identity
		const f = this.listeners.slice()
		const titles = []
		for (const filter of f) {
			try {
				const res = await filters.getChange(id, filter.title)
				if (res && res.date) {
					const date = this.filterDates[filter.title]
					this.filterDates[filter.title] = res.date
					if (date && date < res.date) {
						titles.push(filter.title)
					}
				}
			} catch (ex) { }
		}
		if (titles.length)
			this.showChanged(titles)
	}

	showChanged(titles: string[]) {
		this.setState({
			snackBarVisible: true,
			titles
		})
		setTimeout(() => {
			this.setState({
				snackBarVisible: false
			})
		}, 5000)
	}

	managerListener(filter: Filter) {
		const index = this.listeners.findIndex(t => t.title === filter.title)
		if (index < 0 && !filter.track)
			return
		if (filter.track) {
			this.listeners.push(filter)
		} else {
			this.listeners.splice(index, 1)
		}
	}

	setNativeProps(nativeProps) {
		this._root.setNativeProps(nativeProps);
	}

	onFilterClick(filter: Filter) {
		this.props.navigation.navigate("FilterDetails", { ...getDefaultNavigationParams(this), filter: filter, color: this.colors.fromUri(filter.uri) })
	}

	onFabClick() {
		this.props.navigation.navigate("AddFilter", getDefaultNavigationParams(this))
	}

	render() {
		const { loading, error, fslvds } = this.state
		if (loading) {
			return (
				<View style={{ padding: 16 }}>
					<Text>Loading...</Text>
				</View>
			)
		} else if (error) {
			return (
				<View style={{ padding: 16 }}>
					<Text>Error: {error}</Text>
				</View>
			)
		} else {
			return (
				<View style={{ flex: 1 }}>
					<ListView
						enableEmptySections={true}
						dataSource={fslvds}
						renderRow={(filter: Filter, sectionId, rowId) => (
							<TouchableHighlight ref={component => this._root = component} onPress={() => this.onFilterClick(filter)}>
								<FilterItem
									name={filter.title}
									description={filter.uri}
									shortName={ColorMapping.getExtFromUri(filter.uri)}
									color={this.colors.fromUri(filter.uri)}
								/>
							</TouchableHighlight>
						)}
					/>
					<FAB
						buttonColor={defaults.ui.accent}
						onClickAction={this.onFabClick.bind(this)}
						snackOffset={this.state.fabIndent}
					/>
					{/*onClickAction={() => this.props.navigation.navigate("Demo")}*/}
					<SnackBar
						distanceCallback={fabIndent => this.setState({ fabIndent })}
						visible={this.state.snackBarVisible}
						textMessage={"Changed: " + (this.state.titles || []).join(", ")}
						actionText="Dismiss"
						accentColor={defaults.ui.accent}
						actionHandler={() => this.setState({ snackBarVisible: false })}
					/>
				</View>
			)
		}
	}

}
