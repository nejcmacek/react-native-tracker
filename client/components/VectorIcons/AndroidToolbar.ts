import { ToolbarAndroid, ToolbarAndroidStatic, ToolbarAndroidAction, ToolbarAndroidProperties, NativeMethodsMixin } from 'react-native'
import * as React from "React";
import { IconNames } from './Icon'

export interface IconToolbarAndroidAction extends ToolbarAndroidAction {
	iconName?: string
	iconColor?: string
	iconSize?: number
}

interface MyProps extends ToolbarAndroidProperties {
	/**
	 * Name of the navigation logo icon (similar to ToolbarAndroid logo)
	 */
	logoName?: IconNames
	/**
	 * Name of the navigation icon (similar to ToolbarAndroid navIcon)
	 */
	navIconName?: IconNames
	/**
	 * Name of the overflow icon (similar to ToolbarAndroid overflowIcon).
	 */
	overflowIconName?: string
	/**
	 * Possible actions on the toolbar as part of the action menu, takes the additional arguments iconName, iconColor and iconSize.	
	 */
	actions?: IconToolbarAndroidAction[]
	/**
	 * Size of the icons.
	 */
	iconSize?: number
	/**
	 * Color of the icons.
	 */
	iconColor?: string
}

export type IconToolbarAndroid = NativeMethodsMixin & React.ComponentClass<MyProps>

export default IconToolbarAndroid;
