import { ApplicationContext } from "../../index";
import { Request, Response, NextFunction } from "express"
import AuthRestServiceComponent from "./components/auth";
import FilterRestServiceComponent from "./components/filters";
import RestServiceComponent, { RestServiceComponentConstructor } from "./component";
import UtilityRestServiceComponent from "./components/util";
import StaticRestServiceComponent from "./components/static";
import AdminRestServiceComponent from "./components/admin";

const components: RestServiceComponentConstructor[] = [
	AuthRestServiceComponent,
	FilterRestServiceComponent,
	UtilityRestServiceComponent,
	StaticRestServiceComponent,
	AdminRestServiceComponent
]

export default class RestService {

	components: RestServiceComponent[]

	constructor(
		public readonly context: ApplicationContext
	) {
		this.components = components.map(T => new T(context, this))
	}

	init() {
		this.components.forEach(t => t.init())
	}

}
