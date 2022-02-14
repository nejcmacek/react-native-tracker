import { Context } from 'vm';
import { Conversation } from './types';
import { Identity } from "../helpers/identity";


export interface DefaultBotContext { }

export interface ResponseContext<T = DefaultBotContext> {
	msg: Message
	data: BotData & T
	identity: Identity
}

export abstract class Bot<T = DefaultBotContext> implements Conversation {

	constructor(
		public readonly name: string,
		public readonly shortName: string,
		public readonly description: string,
		public readonly id: string
	) { }

	startChat(identity: Identity) {
		if (!identity)
			throw new Error('Cannot chat with anonymous.')
		if (!('bots' in identity))
			identity.bots = {}
		if (!(this.id in identity.bots))
			identity.bots[this.id] = {}
		const data = identity.bots[this.id] as BotData & T
		initBotData(data)
		return new Chat<this, T>(this, data, identity);
	}

	abstract respond(context: ResponseContext<T>): Promise<Message[]>;

}

function initBotData(data: BotData) {
	if (!data.history)
		data.history = []
}

export interface BotData {
	history: Message[]
}

export class Chat<TBot extends Bot, TBotContext> {

	constructor(
		public readonly bot: TBot,
		public readonly botData: TBotContext & BotData,
		private readonly identity: Identity
	) { }

	async send(message: string) {
		const msg = {
			text: message,
			timestamp: Date.now(),
			sender: true
		}
		this.botData.history.push(msg)
		const response = this.bot.respond({
			msg,
			identity: this.identity,
			data: this.botData
		})
		if (!response) return
		const result = await response
		this.botData.history.push(...result)
		return [msg, ...result]
	}

}

export interface Message {
	text: string
	timestamp: number
	sender: boolean // true = person, false = bot
}
