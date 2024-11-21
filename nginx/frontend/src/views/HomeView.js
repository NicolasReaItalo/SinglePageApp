import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
	constructor(params){
		super(params);
		this.setTitle("Home");
	}

	async getHtml(){
		return `<h1>Welcome Home</h1>
				<p>The url is ${location.pathname } </p>`
				;
	}
}
