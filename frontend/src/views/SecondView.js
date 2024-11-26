import AbstractView from "./AbstractView.js";

class SecondView extends AbstractView {
	constructor(params){
		super(params);
		this._setTitle("Second View");
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
			container.innerHTML = `<h1>Welcome to the Second view</h1>
					<p>The url is ${location.pathname } </p>
					params<br> ${pm} </p>

					`;
		}
	}
}

export default SecondView;
