import { Bot, Message, ResponseContext } from '../../conversations/bot';


export default class RepeatBot extends Bot {

	constructor() {
		super(
			'Repeat Bot',
			'RB',
			'This bot repeats everything you say.',
			'repeat'
		)
	}

	respond(context: ResponseContext): Promise<Message[]> {
		const response: Message[] = [{
			sender: false,
			text: context.msg.text,
			timestamp: Date.now()
		}]
		return Promise.resolve(response)
	}

}