import endpoints from './endpoints';
import { Data } from '../';
import attach from '../util/attach';

export default attach<Data>({
	path: endpoints.misc.template,
	verb: 'all'
}, async context => {
	const { req, data } = context
	return "Hi there!"
})
