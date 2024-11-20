export default class {
	constructor(params){
		this.params = params;
		console.log("params", params);
	}


	setTitle(title){
		document.title = title;
	}

	async getHtml(){
		return "";
	}

	/*
	ajouter gestion des EventHandler et le destructeur
	gestion des parametres
	*/
}
