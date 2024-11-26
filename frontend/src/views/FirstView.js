import AbstractView from "./AbstractView.js";

class FirstView extends AbstractView {
	constructor(params){
		super(params);
		this._setTitle("FirstView");
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
			container.innerHTML = `<h1>Welcome to the First view</h1>
					<a href="/view2" data-link>Link to the second view</a>
					<p>The url is ${location.pathname } </p>
					params<br> ${pm} </p>

					`;
		}
	}
}

export default FirstView;
