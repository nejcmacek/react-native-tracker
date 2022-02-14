import { ComponentType } from "../../util/types";
import { Component } from "react"
import FAB from 'react-native-fab'

interface MyProps {
	/**
	 * Show or hide the FAB
	 */
	visible?: boolean
	/**
	 * The color of FAB
	 */
	buttonColor?: string
	/**
	 * Function to be called when button is pressed
	 */
	onClickAction?: any
	/**
	 * The color of icon of FAB
	 */
	iconTextColor?: string
	/**
	 * Text component or any other component based on it, works great with Icon from react-native-vector-icons
	 */
	iconTextComponent?: JSX.Element
	/**
	 * The amount by which to move up the FAB to accomodate snackbar
	 */
	snackOffset?: number
}

export default FAB as ComponentType<MyProps>
