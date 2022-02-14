import attach from '../helpers/attach';
import BotRegistry from "../bots/bot-registry";


export default attach({
	verb: 'get',
	path: '/api/history/',
	requireAuthenticated: true
}, async context => {
	const { req, resolve, reject, data, identity } = context
	const br = data.botRegistry as BotRegistry
	const { bot: botId, count = -1 } = req.query

	const bot = br.get(botId)
	if (!bot) throw new Error('Bot does not exist.')
	const chat = bot.startChat(identity)
	const { history } = chat.botData
	const cut = count < 0
		? history
		: history.slice(Math.max(history.length - count, 0))

	resolve(cut)
})