import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
	constructor(params){
		super(params);
		this.setTitle("Home");
	}

	async getHtml(){
		return `<h1>Welcome to the first view</h1>
		<a href="/view1/1/2/3" class="nav__link" data-link>test params</a>
				<p>The url is ${location.pathname } </p>`;
	}
}
