import AbstractView from "./AbstractView.js";

class AlertView extends AbstractView {
	constructor(params){
		super(params);
		this._setTitle("test boostrap View");
		this.onStart();
	}

	onStart(){

		this.setHtml();
	}

	setHtml(){
		let pm = '';
		const container = document.querySelector(".container");
		for (const key in this.params){
			pm += String(key) + " : " + this.params[key] + "<br>";
		}
		if (container){
			container.innerHTML = `<h1>Welcome to the boostrap view</h1>
					<div class="alert alert-primary" role="alert">
					A simple primary alert—check it out!
					</div>
					<div class="alert alert-secondary" role="alert">
					A simple secondary alert—check it out!
					</div>
					<div class="alert alert-success" role="alert">
					A simple success alert—check it out!
					</div>
					<div class="alert alert-danger" role="alert">
					A simple danger alert—check it out!
					</div>
					<div class="alert alert-warning" role="alert">
					A simple warning alert—check it out!
					</div>
					<div class="alert alert-info" role="alert">
					A simple info alert—check it out!
					</div>
					<div class="alert alert-light" role="alert">
					A simple light alert—check it out!
					</div>
					<div class="alert alert-dark" role="alert">
					A simple dark alert—check it out!
					</div>
					`;
		}
	}
}

export default AlertView;
