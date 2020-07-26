class EventData {
	
	event;
	commands;
	
	constructor(event) {
		this.event = event;
	}
	
	addCommand(command) {
		this.commands.push(command);
	}
	
}