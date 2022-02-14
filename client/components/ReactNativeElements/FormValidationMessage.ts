import { FormValidationMessage } from 'react-native-elements'
import { StyleSheet, TextInputProperties, NativeMethodsMixin } from 'react-native'
import { ComponentType } from "../../util/types";

interface MyProps extends TextInputProperties {
	/**
	 * 	additional label container style (optional)
	 */
	containerStyle?: StyleSheet.Style
	/**
	 * additional label styling (optional)
	 */
	labelStyle?: StyleSheet.Style
	/**
	 * specify different font family
	 */
	fontFamily?: string
}

export default FormValidationMessage as NativeMethodsMixin & React.ComponentClass<MyProps>
