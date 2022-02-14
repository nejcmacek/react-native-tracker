import BotRegistry from './bot-registry';
import { DefaultExport, Constructor } from "../helpers/types";
import { Bot } from "../conversations/bot";

const botRegistry = new BotRegistry();

const bots = [
	require('./repeat/repeat'),
	require('./random-int/random-int'),
	require('./weather/weather')
] as DefaultExport<Constructor<Bot>>[]

bots
	.map(t => new t.default())
	.forEach(botRegistry.register.bind(botRegistry))

export default botRegistry;
