import AbstractView from "./AbstractView.js";

/*
A View without any DOM reference to use with jest for unit testing the router
*/

class DummyView extends AbstractView {
  constructor(params, app) {
    super(params, app);
    this.onStart();
  }

  onStart() {}
}

export default DummyView;
