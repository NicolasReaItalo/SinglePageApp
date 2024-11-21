import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
	constructor(params){
		super(params);
		this.setTitle("Home");
	}

	async getHtml(){
		let pm = '';
		for (const key in this.params){
			pm += String(key) + " : " + this.params[key] + "<br>";
		}
		return `<h1>Welcome to the first view</h1>
				<p>The url is ${location.pathname } </p>
				params<br> ${pm} </p>

				`;
	}
}
