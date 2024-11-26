import DefaultView from "./views/ErrorView.js";
import Application from "./Application.js";
import AbstractView from "./views/AbstractView.js";
class Router {
  /**
   * The Router class
   * takes an Application instance as a parameter
   * addRoute(schema) : create a route with a matching Regex
   * route() : is called when a data-link is clicked or during a popstate() event
   *this fucntion will match all the route and instantiate the correpsonding view
   * @param {Application} app - a reference to the main app
   */
  static _instance;
  #routes = [];
  #currentView = null;
  #app = null;

  constructor(app) {
    if (Router._instance) {
      throw new Error(
        "Router Singleton classes can't be instantiated more than once."
      );
    }
    if (app === undefined) {
      throw new Error("App reference not passed to constructor");
    }
    Router._instance = this;
    this.addRoute.bind(this);
    this._matchRoute.bind(this);
    this.#app = app;
  }

  setListeners() {
    this._handleLinkClick = this._handleLinkClick.bind(this);
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("popstate", this.route.bind(this));
      document.body.addEventListener("click", this._handleLinkClick);
    });
  }

  _handleLinkClick(event) {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      history.pushState(null, null, event.target.href);
      this.route();
    }
  }

  /* Add a route to the router '/location/.../:dynamicparam1/:dynamicparam2' */
  addRoute(schema, view) {
    /**
     *Adds a route to the router
     * @param {String} schema -the route schema
     * @param {AbstractView} view -the view to instantiate
     */
    if (typeof schema !== "string" || schema[0] !== "/")
      throw new Error("Router: addRoute: Invalid route schema");
    if (schema === "/") {
      this.#routes.push({
        params: [],
        schema: "/",
        split_length: 1,
        view: view,
        regex: new RegExp("^/$"),
      });
    }

    const newroute = {};
    newroute.params = []; // stocke les parametres dynamiques
    newroute.schema = schema; // schema de l'uri
    newroute.view = view; // reference vers la classe view a appeler si la route matche

    const split = schema.split(/\//).filter((str) => str.length > 0);
    newroute.split_length = split.length;
    //checker qu'il n'y a pas de parametres dynamiques avant les params statiques et fabriquer la regex
    let switchedToDyn = false;
    let strregex = "";
    for (const param of split) {
      if (param[0] === ":") {
        switchedToDyn = true;
        newroute.params.push(String(param.slice(1)));
        strregex += "/([^/]+)";
        continue;
      }
      if (param[0] !== ":") {
        if (switchedToDyn)
          throw new Error("Router: addRoute: Invalid route schema");
        strregex += `/${param}`;
      }
    }
    strregex += "$";
    newroute.regex = new RegExp(strregex); // regex permettant de matcher l'uri et le schema
    this.#routes.push(newroute);
  }
  //match the url with the route and return the matched one or null
  _matchRoute(url) {
    for (const route of this.#routes) {
      const url_split = url.split(/\//).filter((str) => str.length > 0);
      if (route.regex.test(url) && route.split_length === url_split.length) {
        let values = route.regex.exec(url);
        values = values.slice(1);
        return new route.view(
          Object.fromEntries(
            route.params.map((key, index) => [key, values[index]])
          ),
          this.#app
        );
      }
    }
    return null;
  }

  route() {
    if (this.#currentView !== null) this.#currentView.onDestroy();
    let newView = this._matchRoute(location.pathname);
    if (newView === null) {
      newView = new DefaultView({});
    }
    this.#currentView = newView;
  }
}

export default Router;
