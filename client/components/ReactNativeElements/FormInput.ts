import { FormInput } from 'react-native-elements'
import { StyleSheet, TextInput, View, TextInputProperties, NativeMethodsMixin } from 'react-native'
import { ComponentType } from "../../util/types";

interface MyProps extends TextInputProperties {
	/**
	 * TextInput container styling (optional)
	 */
	containerStyle?: StyleSheet.Style
	/**
	 * TextInput styling (optional)
	 */
	inputStyle?: StyleSheet.Style
	/**
	 * get ref of TextInput
	 */
	textInputRef?: TextInput
	/**
	 * get ref of TextInput container
	 */
	containerRef?: View
	/**
	 * call focus on the textinput(optional), eg this.refs.someInputRef.focus()
	 */
	focus?: Function
}

export default FormInput as NativeMethodsMixin & React.ComponentClass<MyProps>
