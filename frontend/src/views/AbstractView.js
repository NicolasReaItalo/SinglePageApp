export default class {
	params;
	eventListeners = [];
	constructor(params){
		this.params = params;
	}

	_setTitle(title){
		document.title = title;
	}

	onStart(){} // methode to overwrite



	addEventListener(element, event, handler){
		element.addEventListener(event,handler);
		this.eventListeners.push({element, event, handler});
	}
	deleteEventListener(ObjListener){
		const element = ObjListener.element;
		const event = ObjListener.event;
		const handler = ObjListener.handler;
		element.removeEventListener(event,handler);
	}

	// child onDestryClass to be overrided for in child cleaning
	childOnDestroy(){}

	onDestroy(){
		//cleaning event listeners
		this.eventListeners.forEach((ObjListener)=>{this.deleteEventListener(ObjListener)});
		this.childOnDestroy();
	}
}
