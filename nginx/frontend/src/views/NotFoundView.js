import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
	constructor(params){
		super(params);
		this.setTitle("Home");
	}

	async getHtml(){
		return `<h1>Oh no!</h1>
		<h2>We haven't found the ressource your looking for</h2>
		<a href="/view1/1/2/3" class="nav__link" data-link>test params</a>
				<p>The url is ${location.pathname } </p>`;
	}
}
