import SnackBar from 'react-native-snackbar-component'
import { ComponentType } from "../../util/types";
import { Component } from "react"

interface MyProps {
	/**
	 * Show or hide the snackbar
	 */
	visible?: boolean
	/**
	 * The main message text
	 */
	textMessage?: string
	/**
	 * Function to be called when button is pressed, if absent no action button is shown
	 */
	actionHandler?: Function
	/**
	 * The text of action button, will be uppercased automatically
	 */
	actionText?: string
	/**
	 * The background color of snackbar
	 */
	backgroundColor?: string
	/**
	 * The color of action button text
	 */
	accentColor?: string
	/**
	 * The color of main message text
	 */
	messageColor?: string
	/**
	 * Function to be caled whenever snackbar moves in and out or changes layout, the function will be supplied a number indicating distance taken up by snackbar on bottom.
	 */
	distanceCallback?: (distance: number) => void
}

export default SnackBar as ComponentType<MyProps>
