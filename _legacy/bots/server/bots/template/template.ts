import { Bot, Message, ResponseContext } from '../../conversations/bot';


export default class TemplateBot extends Bot {

	constructor() {
		super(
			'Template Bot',
			'TB',
			'Template Bot Description',
			'template'
		)
	}

	respond(context: ResponseContext): Promise<Message[]> {
		return null
		// const response: Message[] = []
		// return Promise.resolve(response)
	}

}