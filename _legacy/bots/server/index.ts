import botRegistry from './bots/defaults';
import { AttachFn } from './helpers/attach';
import { IdentitytProvider } from './helpers/identity';
import { DefaultExport } from "./helpers/types";
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express()
const idp = new IdentitytProvider()
const data = {
	botRegistry
}
const context = { app, idp, data }

idp.set('1234567890', {
	conversations: ['imagebot', 'myself']
})

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())

const subscribers = [
	require('./api/auth'),
	require('./api/conversations'),
	require('./api/chat'),
	require('./api/history')
] as DefaultExport<AttachFn<typeof data>>[]

subscribers.forEach(t => t.default.call(null, context))

app.listen(3000, () => console.log("Listening..."))
