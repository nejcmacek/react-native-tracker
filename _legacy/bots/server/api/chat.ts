import { Message } from '../conversations/bot';
import attach from '../helpers/attach';
import BotRegistry from "../bots/bot-registry";

export default attach({
	verb: 'post',
	path: '/api/chat/',
	requireAuthenticated: true
}, async context => {
	const { req, reject, resolve, identity } = context
	const br = context.data.botRegistry as BotRegistry
	const { bot: botId, message } = req.body as { [key: string]: string }

	const bot = br.get(botId);
	if (!bot) throw new Error('Bot does not exist.')
	const chat = bot.startChat(identity)

	try {
		const result = await chat.send(message)
		resolve(result)
	} catch (ex) {
		reject(ex.message || ex)
	}
})