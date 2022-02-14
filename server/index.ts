import * as arrayFlatten from "array-flatten";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Express } from "express"
import { MongoClient, Db } from "mongodb";
import { EventEmitter } from "events";
import MongoService from "./mongo";
import config from "./util/config"
import IdentityProvider from "./api/auth/identity";
import RestService from "./api/rest";
import FilterChangeTracker from "./api/filters/change-tracker";

export interface ApplicationContext {
	app: Express
	mongo: MongoService
	events: EventEmitter
	idp: IdentityProvider
	fct: FilterChangeTracker
}

(async () => {
	const db = await MongoClient.connect(config.mongo.uri);

	const app = express()
	const events = new EventEmitter()
	const mongo = new MongoService(db, events)
	const idp = new IdentityProvider(events, mongo.auth)
	const fct = new FilterChangeTracker(events, mongo.filters)

	const context: ApplicationContext = {
		app,
		mongo,
		events,
		idp,
		fct
	}

	app.use(bodyParser.text())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	const restService = new RestService(context)

	app.listen(3000, () => console.log("Listening on localhost:3000..."))
	
	idp.assignToken("nejc", "abc")
	restService.init();
	// fct.changeSettings({ enabled: false })
	fct.init()

})();