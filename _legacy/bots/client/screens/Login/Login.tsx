import { resetNavigation } from '../helpers/helper';
import * as defaults from '../helpers/defaults';
import * as React from 'react';
import { Component } from 'react';
import {
	View,
	StyleSheet,
	TextInput,
	Button,
	Text,
	Modal,
	Alert
} from "react-native";
import { NavgationComponentProps } from 'react-navigation';
import { DefaultScreenProps, SimpleNavigationComponent } from '../helpers/types';
import undefined from '../../scripts/login/identity';


interface MyScreenProps extends DefaultScreenProps {
	loggedOut: boolean
}
interface MyProps extends SimpleNavigationComponent<MyScreenProps> { }
interface MyState {
	username: string
	password: string
	loading: boolean
}


export default class Login extends Component<MyProps, MyState> {

	constructor(props: any) {
		super(props)
		this.state = {
			username: "",
			password: "",
			loading: false
		}
		this.state = {
			username: "nejc",
			password: "12345",
			loading: false
		}
		this.props.navigation.state.params.identity.logOut();
		// this.login()
	}

	static navigationOptions = ({ navigation }) => ({
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
			this.setState({ loading: false, username: '', password: '' })
			// resetNavigation(this.props.navigation, 'Home')
			this.props.navigation.navigate('Home', { identity: id }) // well, yeah
			// this.props.navigation.setParams({ name: 'LOL' })
		} catch (ex) {
			this.setState({ loading: false, username: '', password: '' })
			Alert.alert("Error", ex.message, [{ text: 'Okay' }])
		}
	}

	register() {
		Alert.alert("Not supported", "This feature is not yet supported.", [{
			text: 'Okay' + this.getIdentity().isAnonymous()
		}])
	}


	render() {
		return (
			<View style={styles.container}>
				<TextInput
					autoFocus={true}
					placeholder="username"
					returnKeyType="next"
					value={this.state.username}
					editable={!this.state.loading}
					onChangeText={username => this.setState({ username })}
				/>
				<TextInput
					placeholder="password"
					returnKeyType="done"
					value={this.state.password}
					editable={!this.state.loading}
					secureTextEntry={true}
					onChangeText={password => this.setState({ password })}
					onSubmitEditing={() => this.login()}
				/>
				<View style={styles.submitRow}>
					<View style={styles.buttonHolderRegister}>
						<Button
							title="Register"
							onPress={() => this.register()}
							color={defaults.accent}
						/>
					</View>
					<View style={styles.buttonHolderLogin}>
						<Button
							title="Log in"
							onPress={() => this.login()}
							color={defaults.accent}
						/>
					</View>
				</View>
			</View>
		)
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 16
	},
	submitRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: 16
	},
	buttonHolderRegister: {
		marginRight: 16
	},
	buttonHolderLogin: {
	}
})
