import NotFoundView from "./views/NotFoundView.js";


export default class{

	#routes = [];
	#currentView = null;

	constructor(){
		this.addRoute.bind(this);
		this.matchRoute.bind(this);
	}

	//Public methods
	async route(){

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
		const newroute = {}
		newroute.params = []; // stocke les parametres dynamiques
		newroute.schema = schema;  // schema de l'uri
		newroute.view = view; // reference vers la classe view a appeler si la route matche

		//creation de la regex
		const split = schema.split(/\//).filter((str)=> str.length > 0);
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
		newroute.regex = new RegExp(strregex);
		this.#routes.push(newroute);
	}

	matchRoute(url){
		for (const route of this.#routes){
			if ( route.regex.test(url)){
				let values = route.regex.exec(url);
				values = values.slice(1);
				return  new route.view(Object.fromEntries(route.params.map((key, index) => [key, values[index]])));
			}
		}
		return null;
	}

	async route(){
		let newView = this.matchRoute(location.pathname);
		if (newView === null)
			newView = new NotFoundView({});
		if (this.#currentView !== null)
			this.#currentView.onDestroy();
		this.#currentView = newView;
		document.querySelector(".container").innerHTML = await newView.getHtml();
	}








}
