import Application from "../Application.js";
class AbstractView {
  /**
   * abstract class used to create View classes intancied by
   * Router()
   * @param {Object} params - an object {} containing all the dynamic parameters
   * 			passed by the url
   * @param {Application} app - a reference to the main app
   */
  params;
  eventListeners = [];
  app;
  constructor(params, app) {
    this.params = params;
    this.app = app;
  }

  _setTitle(title) {
    document.title = title;
  }

  onStart() {} // methode to overwrite

  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }
  deleteEventListener(ObjListener) {
    const element = ObjListener.element;
    const event = ObjListener.event;
    const handler = ObjListener.handler;
    element.removeEventListener(event, handler);
  }

  // child onDestryClass to be overrided for in child cleaning
  childOnDestroy() {}

  onDestroy() {
    //cleaning event listeners
    this.eventListeners.forEach((ObjListener) => {
      this.deleteEventListener(ObjListener);
    });
    this.childOnDestroy();
  }
}

export default AbstractView;
