export interface Conversation {
	name: string
	description: string
	shortName: string
	id: string
}

export interface Message {
	text: string,
	sender: boolean,
	timestamp: number
}