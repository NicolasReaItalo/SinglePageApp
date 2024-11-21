export default class {
	constructor(params){
		this.params = params;
	}


	setTitle(title){
		document.title = title;
	}

	async getHtml(){
		return "";
	}


	onDestroy(){
		/*
		ajouter gestion des EventHandler dans le destructeur
		*/
	}  // pour le nettoyage
}
