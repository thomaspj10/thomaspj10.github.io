class Event extends Class {
	
	event;
	
	constructor(className, description, methods, event) {
		super(className, description, methods)
		
		this.event = event
	}
	
}