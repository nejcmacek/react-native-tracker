import * as React from 'react';
import { Component } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import * as defaults from '../../util/defaults';
import { getDefaultNavigationParams, resetNavigation } from '../../util/helper';
import { DefaultScreenProps, SimpleNavigationComponent, NavigationScreenCallback, NamedStyleSheet } from '../../util/types';
import { FormInput, FormLabel, FormValidationMessage } from '../../components/ReactNativeElements/ReactNativeElements';
import Icon from '../../components/VectorIcons/Icon';
import undefined from '../../services/auth/identity';


interface MyScreenProps extends DefaultScreenProps {
	skipLogout: boolean
}
interface MyProps extends SimpleNavigationComponent<MyScreenProps> { }
interface MyState {
	username: string
	password: string
	loading: boolean
	modalVisible: boolean
	registerUsername?: string
	registerPassword?: string
	registerRepeat?: string
	registerDisplayName?: string
}


export default class Login extends Component<MyProps, MyState> {

	constructor(props: any) {
		super(props)
		this.state = {
			username: "",
			password: "",
			loading: false,
			modalVisible: false
		}
		this.state = {
			username: "nejc",
			password: "123",
			loading: false,
			modalVisible: false
		}
		this.props.navigation.state.params.identity.logout();
		// this.login()
	}

	static navigationOptions: NavigationScreenCallback<DefaultScreenProps> = ({ navigation }) => ({
		title: 'Login',
		header: null
	});

	private getIdentity() {
		return this.props.navigation.state.params.identity
	}

	async login() {
		this.setState({ loading: true })
		const id = this.props.navigation.state.params.identity
		try {
			await id.login(this.state.username, this.state.password)
			this.postLogin()
		} catch (ex) {
			this.setState({ loading: false, username: '', password: '' })
			Alert.alert("Error", ex.message)
		}
	}

	async	register() {
		this.setState({ loading: true })
		const id = this.props.navigation.state.params.identity
		try {
			await id.register(
				this.state.registerUsername,
				this.state.registerPassword,
				this.state.registerRepeat,
				this.state.registerDisplayName)
			this.postLogin()
		} catch (ex) {
			this.setState({
				loading: false, registerRepeat: ''
			})
			Alert.alert("Error", ex.message)
		}
	}

	private postLogin() {
		this.setState({
			loading: false,
			username: '',
			password: '',
			registerUsername: '',
			registerPassword: '',
			registerRepeat: '',
			registerDisplayName: '',
			modalVisible: false
		})
		this.props.navigation.navigate('Home', getDefaultNavigationParams(this))
	}

	render() {
		return (
			<View style={styles.container}>
				<FormLabel>Username</FormLabel>
				<FormInput
					autoFocus={true}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Enter your username"
					returnKeyType="next"
					value={this.state.username}
					editable={!this.state.loading}
					onChangeText={username => this.setState({ username })}
					underlineColorAndroid={defaults.ui.accent}
				/>
				<FormLabel>Password</FormLabel>
				<FormInput
					placeholder="Enter your password"
					returnKeyType="done"
					autoCapitalize="none"
					autoCorrect={false}
					value={this.state.password}
					editable={!this.state.loading}
					secureTextEntry={true}
					onChangeText={password => this.setState({ password })}
					onSubmitEditing={() => this.login()}
					underlineColorAndroid={defaults.ui.accent}
				/>
				<View style={styles.submitRow}>
					<View style={styles.buttonHolderRegister}>
						<Button
							title="Register"
							onPress={() => this.setState({ modalVisible: true })}
							disabled={this.state.loading}
							color={defaults.ui.accent}
						/>
					</View>
					<View style={styles.buttonHolderLogin}>
						<Button
							title="Log in"
							disabled={this.state.loading}
							onPress={() => this.login()}
							color={defaults.ui.accent}
						/>
					</View>
				</View>
				<Modal
					visible={this.state.modalVisible}
					onRequestClose={() => this.setState({ modalVisible: false })}
					animationType="slide"
				>
					<View style={{ flex: 1 }}>
						<Icon.ToolbarAndroid
							style={{ height: 56, backgroundColor: defaults.ui.accent, zIndex: 2 }}
							navIconName="md-arrow-back"
							onIconClicked={() => this.setState({ modalVisible: false })}
							title="Register"
							titleColor={defaults.ui.textBlack}
						/>
						<View style={styles.container}>
							<FormLabel>Display Name</FormLabel>
							<FormInput
								autoFocus={true}
								autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="next"
								value={this.state.registerDisplayName}
								editable={!this.state.loading}
								onChangeText={registerDisplayName => this.setState({ registerDisplayName })}
								underlineColorAndroid={defaults.ui.accent}
							/>
							<FormLabel>Username</FormLabel>
							<FormInput
								autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="next"
								value={this.state.registerUsername}
								editable={!this.state.loading}
								onChangeText={registerUsername => this.setState({ registerUsername })}
								underlineColorAndroid={defaults.ui.accent}
							/>
							<FormLabel>Password</FormLabel>
							<FormInput
								returnKeyType="next"
								autoCapitalize="none"
								autoCorrect={false}
								value={this.state.registerPassword}
								editable={!this.state.loading}
								secureTextEntry={true}
								onChangeText={registerPassword => this.setState({ registerPassword })}
								underlineColorAndroid={defaults.ui.accent}
							/>
							<FormLabel>Repeat Password</FormLabel>
							<FormInput
								returnKeyType="done"
								autoCapitalize="none"
								autoCorrect={false}
								value={this.state.registerRepeat}
								editable={!this.state.loading}
								secureTextEntry={true}
								onChangeText={registerRepeat => this.setState({ registerRepeat })}
								onSubmitEditing={() => this.register()}
								underlineColorAndroid={defaults.ui.accent}
							/>
							<View style={styles.submitRow}>
								<View style={styles.buttonHolderRegister}>
									<Button
										title="Register"
										onPress={() => this.register()}
										disabled={this.state.loading}
										color={defaults.ui.accent}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}


}

const styles = StyleSheet.create<NamedStyleSheet>({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	submitRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 16
	},
	buttonHolderRegister: {
		marginRight: 16
	},
	buttonHolderLogin: {
	}
})
