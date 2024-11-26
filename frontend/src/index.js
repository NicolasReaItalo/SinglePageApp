/**
 * The entrypoint of our great app
 */
import MyView from "./views/MyView.js";
import FirstView from "./views/FirstView.js";
import SecondView from "./views/SecondView.js";
import AlertView from "./views/AlertView.js";
import FormView from "./views/FormView.js";
import Router from "./Router.js";
import Application from "./Application.js";

const app = new Application();
const router = new Router(app);
router.addRoute("/view1/:id/:page", FirstView);
router.addRoute("/view1/:id", FirstView);
router.addRoute("/view1", FirstView);
router.addRoute("/myview", MyView);
router.addRoute("/view2", SecondView);
router.addRoute("/bootstrap", AlertView);
router.addRoute("/form", FormView);
router.addRoute("/", MyView);
router.setListeners();
router.route();
