import Application from "./Application";

const app = new Application();
// try to create a new instance of Application() which should throw an error
test("Test App: Singleton", () => {
  expect(() => {
    const s = new Application();
  }).toThrow();
});
