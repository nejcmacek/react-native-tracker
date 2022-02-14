import attach from '../helpers/attach';
import { Conversation } from "../conversations/types";
import BotRegistry from "../bots/bot-registry";

export default attach({ verb: 'get', path: '/api/conversations/' }, context => {
	const { req, resolve, reject, data } = context
	const br = data.botRegistry as BotRegistry
	resolve(br.bots)
})
