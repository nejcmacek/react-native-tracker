import { Conversation, Message } from '../../scripts/conversations/types';
import * as React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ScrollView, ListViewDataSource, ListView, Alert } from 'react-native'
import { SimpleNavigationComponent, DefaultScreenProps } from "../../screens/helpers/types";
import * as defaults from '../../screens/helpers/defaults';
import MessageItem from "../../components/MessageItem/MessageItem";


interface MyScreenProps extends DefaultScreenProps {
	con: Conversation
}
interface MyProps extends SimpleNavigationComponent<MyScreenProps> { }
interface MyState {
	loading: boolean
	error?: string
	msgs: Message[]
	msgsDs: ListViewDataSource,
	message: string,
	sending: boolean
}


export default class Chat extends Component<MyProps, MyState> {

	static navigationOptions = ({ navigation }) => ({
		title: `Chat`
	});

	scrollView: any
	_root: any

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			error: null,
			msgs: null,
			msgsDs: null,
			message: "",
			sending: false
		}
		this.loadData()
	}

	updateMsgs(msgs: Message[]) {
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.setState({
			msgs,
			msgsDs: ds.cloneWithRows(msgs),
			loading: false,
			error: null
		})
	}

	async loadData() {
		const { identity, con } = this.props.navigation.state.params
		try {
			const msgs = await identity.get(`/api/history/?bot=${con.id}`)
			this.updateMsgs(msgs)
		} catch (ex) {
			this.setState({ loading: false, error: ex.message || ex })
		}
	}

	load() {
		this.setState({ loading: true, error: null })
		this.loadData()
	}

	async send() {
		const message = this.state.message.trim()
		if (!message) {
			this.setState({ message: "" })
			return
		}
		this.setState({ sending: true })
		const { con, identity } = this.props.navigation.state.params
		try {
			const response = await identity.post<Message[]>('/api/chat/', {
				message,
				bot: con.id
			})
			const { msgs } = this.state
			msgs.push(...response)
			this.updateMsgs(msgs)
			this.setState({ sending: false, message: "" })
		} catch (ex) {
			Alert.alert("An Error has Occurred", ex.message || ex || "Unknown error.", [{
				text: "Okay"
			}])
			this.setState({ sending: false })
		}
	}

	isFlatTop(index: number) {
		const { msgs } = this.state
		const prev = msgs[index - 1]
		if (!prev) return false
		const msg = msgs[index]
		return msg.sender === prev.sender
	}

	isFlatBottom(index: number) {
		const { msgs } = this.state
		const next = msgs[Number(index) + 1]
		if (!next) return false
		const msg = msgs[index]
		return msg.sender === next.sender
	}

	render() {
		const { error, loading } = this.state
		if (error) {
			return (
				<View style={{ padding: 16 }}>
					<Text style={{ marginBottom: 8 }}>Error: {error}</Text>
					<Button
						title="Reload"
						color={defaults.accent}
						onPress={() => this.load()}
					/>
				</View>
			)
		}
		if (loading) {
			return (
				<Text style={{ padding: 16 }}>Loading...</Text>
			)
		}
		return (
			<View style={styles.holder}>
				<View style={styles.msgHolder}>
					<ScrollView
						style={{ flexWrap: 'nowrap', marginBottom: 48 }}
						ref={ref => this.scrollView = ref}
						onContentSizeChange={(contentWidth, contentHeight) => {
							this.scrollView.scrollTo({ y: contentHeight, animated: true });
						}}>
						<ListView
							enableEmptySections={true}
							style={{ paddingTop: 8 }}
							ref={component => this._root = component}
							dataSource={this.state.msgsDs}
							renderRow={(rowData, sectionId, rowId: number) => (
								<MessageItem
									msg={rowData}
									flatBottom={this.isFlatBottom(rowId)}
									flatTop={this.isFlatTop(rowId)}
								/>
							)}
						/>
					</ScrollView>
				</View>
				<View style={styles.inputHolder}>
					<View style={styles.inputHolderInner}>
						<TextInput
							style={styles.input}
							underlineColorAndroid="#eee"
							multiline={false}
							placeholder="Enter message"
							autoCorrect
							value={this.state.message}
							editable={!this.state.sending}
							onChangeText={message => this.setState({ message })}
							onSubmitEditing={() => this.send()}
						/>
						<View style={styles.button}>
							<Button
								title="Send"
								onPress={() => this.send()}
								color={defaults.accent}
								disabled={this.state.sending}
							/>
						</View>
					</View>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	holder: {
		flex: 1
	},
	msgHolder: {
		flexGrow: 1
	},
	inputHolder: {
		backgroundColor: 'white',
		paddingLeft: 8,
		paddingRight: 8,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 48
	},
	inputHolderInner: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'center',
		alignItems: 'center'
	},
	input: {
		flexGrow: 1,
		marginRight: 16
	},
	button: {
		borderRadius: 16
	}
})