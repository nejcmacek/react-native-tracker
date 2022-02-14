import { ComponentType } from "../../util/types";
import { Component } from "react"
import { StyleSheet } from "react-native"
import { CheckBox } from 'react-native-elements'

interface MyProps {
	/**
	 * icon family, can be one of the following: simple-line-icon, zocial, octicon, material, material-community, ionicon, foundation, evilicon, entypo (required only if specifying an icon that is not from font-awesome)
	 */
	iconType?: string
	/**
	 * Native Component	specify React Native component for main button (optional)
	 */
	component?: Component<any, any>
	/**
	 * flag for checking the icon (required)
	 */
	checked: boolean
	/**
	 * moves icon to right of text (optional)
	 */
	iconRight?: boolean
	/**
	 * aligns checkbox to right (optional)
	 */
	right?: boolean
	/**
	 * aligns checkbox to center (optional)
	 */
	center?: boolean
	/**
	 * title of checkbox (required)
	 */
	title: string
	/**
	 * style of main container (optional)
	 */
	containerStyle?: StyleSheet.Style
	/**
	 * style of text (optional)
	 */
	textStyle?: StyleSheet.Style
	/**
	 * onLongPress function for checkbox (optional)
	 */
	onLongPress?: Function
	/**
	 * onLongPress function for checkbox (optional)
	 */
	onLongIconPress?: Function
	/**
	 * onPress function for container (optional)
	 */
	onPress?: Function
	/**
	 * onPress function for checkbox (required)
	 */
	onIconPress: Function
	/**
	 * default checked icon (Font Awesome Icon) (optional)
	 */
	checkedIcon?: string
	/**
	 * string	default checked icon (Font Awesome Icon) (optional)
	 */
	uncheckedIcon?: string
	/**
	 * default checked color (optional)
	 */
	checkedColor?: string
	/**
	 * default unchecked color (optional)
	 */
	uncheckedColor?: string
	/**
	 * specify a custom checked message (optional)
	 */
	checkedTitle?: string
	/**
	 * bold (iOS), Sans Serif Bold (android)	string	specify different font family
	 */
	fontFamily?: string
}

export default CheckBox as ComponentType<MyProps>
