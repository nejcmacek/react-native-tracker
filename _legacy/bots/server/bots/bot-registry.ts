import { Bot } from '../conversations/bot';


interface BotTable {
	[key: string]: Bot
}

export default class BotRegistry {

	table: BotTable = {}
	bots: Bot[] = []

	register(bot: Bot) {
		if (bot.id in this.table)
			throw new Error(`Bot with id "${bot.id}" already registered.`)
		this.table[bot.id] = bot
		this.bots.push(bot)
	}

	get(id: string) {
		return this.table[id]
	}

	get count() {
		return this.bots.length
	}

}