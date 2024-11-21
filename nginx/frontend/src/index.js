import HomeView from "./views/HomeView.js";
import FirstView from "./views/FirstView.js";
import SecondView from "./views/SecondView.js";
import Router from "./Router.js";


const r = new Router();

r.addRoute('/view1/:id/:page', FirstView);
r.addRoute('/view1/:id', FirstView);
r.addRoute('/view1', FirstView);
r.addRoute('/home', HomeView);
r.addRoute('/', HomeView);
r.addRoute('/view2', SecondView);
r.setListeners();
r.route();
