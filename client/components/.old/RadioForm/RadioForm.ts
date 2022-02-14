import { ComponentType } from '../../util/types';
import RadioForm from 'react-native-simple-radio-button'

interface RadioFormProp {
	value: number
	label: string
}

interface MyProps {
	radio_props: RadioFormProp[]
	onPress: (value: number) => any
	initial?: number
	buttonColor?: string
	labelColor?: string
	formHorizontal?: boolean
	labelHorizontal?: boolean
	animation?: boolean
}

export default RadioForm as ComponentType<MyProps>
