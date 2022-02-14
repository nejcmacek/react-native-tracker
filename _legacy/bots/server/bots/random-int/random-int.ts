import { createBotMessage } from '../utility';
import { Bot, Message, ResponseContext } from '../../conversations/bot';


export default class RepeatBot extends Bot {

	constructor() {
		super(
			'Random Integer Bot',
			'RI',
			'This gives you random integers in specified range.',
			'random-int'
		)
	}

	respond(context: ResponseContext): Promise<Message[]> {
		const text = context.msg.text.trim().toLowerCase()
		let response: Message[];
		if (text === "help") {
			response = [
				'Returns a random number between min (inclusive) and max (exclusive).',
				'Usage: "[min] max"',
				'Min may be omitted, default to 0.'
			].map(createBotMessage)
		} else {
			const result = process(context.msg.text)
			response = [(
				result === null
					? createBotMessage('Invalid input. Type "help" for help.')
					: createBotMessage(result.toString())
			)]
		}
		return Promise.resolve(response)
	}

}

function process(text: string): number | null {
	let result = text
		.split(/\s+/g)
		.map(t => Number(t))

	if (!result.every(t => !isNaN(t)))
		return null
	if (result.length > 2 || result.length < 1)
		return null

	if (result.length === 1)
		result = [0, ...result]

	let [min, max] = result
	if (min === max) return min
	if (min > max) ({ min, max } = { max, min })

	return Math.floor(Math.random() * (max - min + 1)) + min;
}