import * as React from 'react'
import { Component } from 'react'
import { View, Text, ListView, ListViewDataSource, TouchableHighlight } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps } from "../helpers/types";
import Conversationitem from "../../components/ConversationItem/ConversationItem";
import { Conversation } from "../../scripts/conversations/types";
import { resetNavigation } from "../helpers/helper";

interface MyProps extends SimpleNavigationComponent<DefaultScreenProps> { }
interface MyState {
	cs: Conversation[]
	csd: ListViewDataSource,
	error: string
}


export default class Home extends Component<MyProps, MyState> {

	static navigationOptions = ({ navigation }) => ({
		title: 'Home'
	})

	_root: any

	constructor(props) {
		super(props)
		this.state = {
			cs: null,
			csd: null,
			error: null
		}
		this.loadData()
	}

	private async loadData() {
		try {
			const cs = await this.props.navigation.state.params.identity.get('/api/conversations/')
			const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
			this.setState({
				cs,
				csd: ds.cloneWithRows(cs)
			})
		} catch (ex) {
			this.setState({ error: ex })
		}
	}

	async load() {
		this.setState({ cs: null, csd: null, error: null })
		this.loadData()
	}

	onClick(index: number) {
		const con = this.state.cs[index];
		const { identity } = this.props.navigation.state.params
		this.props.navigation.navigate('Chat', { identity, con })
	}

	setNativeProps(nativeProps) {
		this._root.setNativeProps(nativeProps);
	}

	render() {
		const cs = this.state.cs
		if (cs) {
			return (
				<ListView
					dataSource={this.state.csd}
					renderRow={(rowData, sectionId, rowId) => (
						<TouchableHighlight ref={component => this._root = component} onPress={() => this.onClick(rowId as number)}>
							<Conversationitem chat={rowData}></Conversationitem>
						</TouchableHighlight>
					)}
				/>
			)
		} else {
			return (
				<View style={{ padding: 16, justifyContent: 'center' }}>
					<Text>Loading...</Text>
				</View>
			)
		}
	}

}
