import { createBotMessage } from '../utility';
import { Bot, Message, ResponseContext } from '../../conversations/bot';
import * as weather from 'weather-js'


export default class WeatherBot extends Bot {

	constructor() {
		super(
			'Weather Bot',
			'WB',
			'What\'s the weather like?',
			'weather'
		)
	}

	respond(context: ResponseContext): Promise<Message[]> {
		const query = context.msg.text
		return new Promise((resolve, reject) => {
			let response: Message[];
			weather.find({ search: query, degreeType: 'C' }, function (err, result) {
				if (err) {
					response = [
						createBotMessage('Unable to retrieve weather information.')
					]
				} else {
					try {
						const { location, current, forecast } = result[0]
						const tomorrow = forecast[0]
						response = [
							'Temperature: ' + current.temperature + '°C',
							'Weather: ' + current.skytext,
							'Tomorrow: ' + tomorrow.skytextday
						].map(createBotMessage)
					} catch (ex) {
						response = [
							createBotMessage('Unable to retrieve weather information.')
						]
					}
				}
				resolve(response)
			});
		})
	}

}