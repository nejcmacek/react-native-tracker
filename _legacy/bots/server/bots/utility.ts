import { Message } from '../conversations/bot';

export function createBotMessage(text: string): Message {
	return {
		text,
		timestamp: Date.now(),
		sender: false
	}
}