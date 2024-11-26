import AbstractView from "./AbstractView.js";

class FormView extends AbstractView {
  constructor(params, app) {
    super(params, app);
    this._setTitle("test boostrap View");
    this.onStart();
  }

  onStart() {
    this.setHtml();
    const switch_button = document.querySelector(".toggle-theme");
    this.addEventListener(switch_button, "click", this.toggleMode);
  }

  toggleMode(e) {
    e.stopPropagation();
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  }

  setHtml() {
    let pm = "";
    const container = document.querySelector(".container");
    for (const key in this.params) {
      pm += String(key) + " : " + this.params[key] + "<br>";
    }
    if (container) {
      container.innerHTML = `
<h1>Welcome to the Form view</h1>
<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <span class="input-group-text" id="basic-addon2">@example.com</span>
</div>

<div class="mb-3">
  <label for="basic-url" class="form-label">Your vanity URL</label>
  <div class="input-group">
    <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
  </div>
  <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Username" aria-label="Username">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Server" aria-label="Server">
</div>

<div class="input-group">
  <span class="input-group-text">With textarea</span>
  <textarea class="form-control" aria-label="With textarea"></textarea>
</div>

<button type="button" class="toggle-theme btn btn-secondary">switch color theme</button>
`;
    }
  }
}

export default FormView;
