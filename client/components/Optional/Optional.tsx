import * as React from 'react'
import { Component } from 'react'
import { Text } from 'react-native'


interface MyProps {
	value: boolean
	componentTrue?: any
	componentFalse?: any
}
interface MyState { }


export default class OptionalComp extends Component<MyProps, MyState> {

	render() {
		if (this.props.value)
			return this.props.componentTrue || null
		else
			return this.props.componentFalse || null
	}

}
