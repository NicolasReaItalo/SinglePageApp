import MyView from "./views/MyView.js";
import FirstView from "./views/FirstView.js";
import SecondView from "./views/SecondView.js";
import AlertView from "./views/AlertView.js";
import FormView from "./views/FormView.js";
import Router from "./Router.js";


const r = new Router();

r.addRoute('/view1/:id/:page', FirstView);
r.addRoute('/view1/:id', FirstView);
r.addRoute('/view1', FirstView);
r.addRoute('/myview', MyView);
r.addRoute('/view2', SecondView);
r.addRoute('/bootstrap', AlertView);
r.addRoute('/form', FormView);
r.addRoute('/', MyView);
r.setListeners();
r.route();

