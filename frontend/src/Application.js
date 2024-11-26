/**

 */
class Application {
  /**
   * A placeholder class, I'm not really sure for what
   * it will be used. The idea is that it is a Singleton class
   * that is instantiated once at the start wh's reference will be passed
   * as a parameter to the router so the views can share data and access useful methods
   */
  constructor() {
    if (Application._instance) {
      throw new Error(
        "Application Singleton classe can't be instantiated more than once."
      );
    }
    Application._instance = this;
  }
}
export default Application;
