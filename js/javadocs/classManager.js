class ClassManager {
	
	classes = [];
	events = [];
	
	constructor() {
		this.loadClasses();
		this.loadEvents();
	}
	
	/*
		Load the classes from the json file and parse them.
	*/
	loadClasses() {
		var self = this;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				var classes = JSON.parse(xhr.responseText);
				
				for (var c of classes) {
					var methods = []
					for (var m of c.methods) {
						var method = new Method(m.method, m.description, m.parameters.split(" "), m.returns, c.name);
						
						methods.push(method);
					}
					
					var classObject = new Class(c.name, c.description, methods);
					self.classes.push(classObject);
				}
				
				Debug.log("Classes loaded.");
				const event = new CustomEvent("classesLoaded", {});
				document.dispatchEvent(event);
			}
		}
		xhr.open('GET', "./classes/classes.json", true);
		xhr.send(null);
	}
	
	/*
		Load the events from the json file and parse them.
	*/
	loadEvents() {
		var self = this;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				var classes = JSON.parse(xhr.responseText);
				
				for (var c of classes) {
					var methods = []
					for (var m of c.methods) {
						var method = new Method(m.method, m.description, m.parameters.split(" "), m.returns, c.name);
						
						methods.push(method);
					}
					
					var eventObject = new Event(c.name, c.description, methods, c.name);
					self.events.push(eventObject);
				}
				
				Debug.log("Events loaded.");
				
				const event = new CustomEvent("eventsLoaded", {});
				document.dispatchEvent(event);
			}
		}
		xhr.open('GET', "./classes/events.json", true);
		xhr.send(null);
	}
	
	/*
		Returns a `Class` object by name.
	*/
	getClass(name) {
		for (var Class of this.classes) {
			if (Class.className === name) {
				return Class;
			}
		}
		
		return null;
	}
	
	/*
		Returns if a Class exists by name.
	*/
	hasClass(name) {
		for (var Class of this.classes) {
			if (Class.className === name) {
				return true;
			}
		}
		
		return false;
	}
	
	/*
		Returns an `Event` object by name.
	*/
	getEvent(name) {
		for (var Class of this.events) {
			if (Class.className === name) {
				return Class;
			}
		}
		
		return null;
	}
	
	/*
		Returns if an Event exists by name.
	*/
	hasEvent(name) {
		for (var Class of this.events) {
			if (Class.className === name) {
				return true;
			}
		}
		
		return false;
	}
	
	/*
		Get the tree of methods from a `Class`.
	*/
	getMethodTree(name, tree=[]) {
		var classes = [];
		
		if (this.hasClass(name)) {
			classes = this.classes;
		}
		
		if (this.hasEvent(name)) {
			classes = this.events;
		}
		
		for (var Class of classes) {
			if (Class.className == name) {
				for (var method of Class.methods) {
					tree[method.name + "(" + method.parameters.join(" ") + ")"] = this.getMethodTree(method.returns);
				}
			}
		}
		
		return tree;
	}
	
}