import * as defaults from '../helpers/defaults';
import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loading: false
        };
        this.state = {
            username: "nejc",
            password: "12345",
            loading: false
        };
        this.props.navigation.state.params.identity.logOut();
        // this.login()
    }
    getIdentity() {
        return this.props.navigation.state.params.identity;
    }
    async login() {
        this.setState({ loading: true });
        const id = this.props.navigation.state.params.identity;
        try {
            await id.login(this.state.username, this.state.password);
            this.setState({ loading: false, username: '', password: '' });
            // resetNavigation(this.props.navigation, 'Home')
            this.props.navigation.navigate('Home', { identity: id }); // well, yeah
            // this.props.navigation.setParams({ name: 'LOL' })
        }
        catch (ex) {
            this.setState({ loading: false, username: '', password: '' });
            Alert.alert("Error", ex.message, [{ text: 'Okay' }]);
        }
    }
    register() {
        Alert.alert("Not supported", "This feature is not yet supported.", [{
                text: 'Okay' + this.getIdentity().isAnonymous()
            }]);
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(TextInput, { autoFocus: true, placeholder: "username", returnKeyType: "next", value: this.state.username, editable: !this.state.loading, onChangeText: username => this.setState({ username }) }),
            React.createElement(TextInput, { placeholder: "password", returnKeyType: "done", value: this.state.password, editable: !this.state.loading, secureTextEntry: true, onChangeText: password => this.setState({ password }), onSubmitEditing: () => this.login() }),
            React.createElement(View, { style: styles.submitRow },
                React.createElement(View, { style: styles.buttonHolderRegister },
                    React.createElement(Button, { title: "Register", onPress: () => this.register(), color: defaults.accent })),
                React.createElement(View, { style: styles.buttonHolderLogin },
                    React.createElement(Button, { title: "Log in", onPress: () => this.login(), color: defaults.accent })))));
    }
}
Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    header: null
});
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
    buttonHolderLogin: {}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJMb2dpbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2xDLE9BQU8sRUFDTixJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxNQUFNLEVBR04sS0FBSyxFQUNMLE1BQU0sY0FBYyxDQUFDO0FBaUJ0QixNQUFNLENBQUMsT0FBTyxZQUFhLFNBQVEsU0FBMkI7SUFFN0QsWUFBWSxLQUFVO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLE9BQU8sRUFBRSxLQUFLO1NBQ2QsQ0FBQTtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JELGVBQWU7SUFDaEIsQ0FBQztJQU9PLFdBQVc7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNoQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFL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