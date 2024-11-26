import DefaultView from "./views/ErrorView.js";

class Router {
	static _instance;
	#routes = [];
	#currentView = null;

	constructor(){
		if (Router._instance) {
			throw new Error("Router Singleton classes can't be instantiated more than once.")
		  }
		  Router._instance = this;
		this.addRoute.bind(this);
		this._matchRoute.bind(this);
	}

	setListeners() {
		this._handleLinkClick = this._handleLinkClick.bind(this);
		document.addEventListener("DOMContentLoaded", () => {
			window.addEventListener("popstate", this.route.bind(this));
			document.body.addEventListener("click", this._handleLinkClick);
		});
	}

	//Private helper methods
	_handleLinkClick (event){
		if (event.target.matches("[data-link]")) {
			event.preventDefault();
			this.#_navigateTo(event.target.href);
		}
	}

	#_navigateTo = url => {
		history.pushState(null, null, url);
		this.route();
	};


	/* Add a route to the router '/location/.../:dynamicparam1/:dynamicparam2' */
	addRoute (schema, view){
		if (typeof schema !== "string" || schema[0] !== "/")
			throw new Error("Router: addRoute: Invalid route schema");
		if (schema === "/"){
			this.#routes.push(
			{
				params: [],
				schema: "/",
				split_length : 1,
				view: view,
				regex : new RegExp('^\/$')
			});
		}

		const newroute = {}
		newroute.params = []; // stocke les parametres dynamiques
		newroute.schema = schema;  // schema de l'uri
		newroute.view = view; // reference vers la classe view a appeler si la route matche

		const split = schema.split(/\//).filter((str)=> str.length > 0);
		newroute.split_length = split.length;
		//checker qu'il n'y a pas de parametres dynamiques avant les params statiques et fabriquer la regex
		let switchedToDyn = false;
		let strregex = "";
		for (const param of split){
			if (param[0] === ":"){
				switchedToDyn = true;
				newroute.params.push(String(param.slice(1)));
				strregex += '\/([^/]+)';
				continue;
			}
			if (param[0] !== ":"){
				if (switchedToDyn)
					throw new Error("Router: addRoute: Invalid route schema");
				strregex += `/${param}`;

			}
		}
		strregex += '$';
		newroute.regex = new RegExp(strregex); // regex permettant de matcher l'uri et le schema
		this.#routes.push(newroute);
	}
	//match the url with the route and return the matched one or null
	_matchRoute(url){
		for (const route of this.#routes){
			const url_split = url.split(/\//).filter((str)=> str.length > 0);
			if ( route.regex.test(url) && route.split_length === url_split.length){
				console.log("matched with :", route.schema);
				let values = route.regex.exec(url);
				values = values.slice(1);
				return  new route.view(Object.fromEntries(route.params.map((key, index) => [key, values[index]])));
			}
		}
		return null;
	}


	route(){
		if (this.#currentView !== null)
			this.#currentView.onDestroy();
		let newView = this._matchRoute(location.pathname);
		if (newView === null){
			console.log("Router: No matching route found");
			newView = new DefaultView({});
		}
		this.#currentView = newView;
	}

}

export default Router;
