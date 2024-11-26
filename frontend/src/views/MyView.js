import AbstractView from "./AbstractView.js";

class MyView extends AbstractView {
	constructor(params){
		super(params);
		this._setTitle("MyView");
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
			container.innerHTML = `<h1>Welcome to  My view</h1>
					<p>The url is ${location.pathname } </p>
					params<br> ${pm} </p>
					<a href="/view1" data-link>Link to the first view</a><br>
					<a href="/view1/myid" data-link>Link to the first view with dynamic parameter id</a><br>
					<a href="/view1/myid/mypage" data-link>Link to the first view with dynamic parameters id and page </a><br>
					<a href="/bootstrap" data-link>Alertes boostrap</a><br>
					<a href="/view2" data-link>Link to the second view</a>
					<a href="/form" data-link>Link to the form view</a>

					`;
		}
	}
}

export default MyView;
