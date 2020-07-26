class UI {
	
	app;
	
	navigationUI;
	
	constructor(app) {
		this.app = app;
		
		var self = this;
		
		document.addEventListener("classesLoaded", function(e) {
			
		});
		
		document.addEventListener("eventsLoaded", function(e) {
			self.navigationUI = new NavigationUI();
			
			self.registerDroppable();
		});
	}
	
	/*
		Register all the droppables. 
	*/
	registerDroppable() {
		var self = this;
		
		// Register the droppable for methods.
		$(".ui-method-drop").droppable({
			drop: function(event, ui) {
				var element = ui.draggable[0];
				var method = element.getAttribute("data-method");
					
				// Check if the method needs parameters.
				var parameters = method.split("(")[1].split(")")[0];
				parameters = parameters.split(", ");
					
				// Update the methods tree.
				app.methods.push(method);
				var result = app.ui.navigationUI.loadMethods(app.selectedEvent, app.methods);
					
				if (result) {
					self.addMethodDroppable();
				}
					
				$(this)[0].style = "background-color: 4fd67a;";
					
				$(this)
					.find("p")
					.html(method);
			},
			tolerance: "intersect",
			greedy: true,
			accept: ".ui-method"
		});
		
		// Register the droppable for events.
		$(".ui-event-drop").droppable({
			drop: function(event, ui) {
				var element = ui.draggable[0];
				var event = element.getAttribute("data-event");
					
				$(this)[0].style = "background-color: 4fd67a;";
				app.selectedEvent = event;
					
				app.ui.switchNavigation("methods");
				app.ui.navigationUI.loadMethods(event);
				self.addMethodDroppable();
					
				$(this)
					.find("p")
					.html(event);
			},
			tolerance: "intersect",
			greedy: true,
			accept: ".ui-event"
		});
	}
	
	/*
		Add a new droppable for methods.
	*/
	addMethodDroppable() {
		var div = document.createElement("div");
		
		div.className = "droppable ui-method-drop";
		div.style = "background-color: e0e0e0;";
		
		div.innerHTML = "<b><p style='text-align: center'>Select an Method</p></b>";
		
		document.getElementById("drop-methods").appendChild(div);
		
		this.registerDroppable();
	}
	
	/*
		Switch the navigation.
	*/
	switchNavigation(ui) {
		if (ui == "events") {
			document.getElementById("sidenav-events").style = "color: #f1f1f1;";
			document.getElementById("sidenav-methods").style = "";
			
			document.getElementById("events").style = "display: block;";
			document.getElementById("methods").style = "display: none;";
		}
		
		if (ui == "methods") {
			document.getElementById("sidenav-events").style = "";
			document.getElementById("sidenav-methods").style = "color: #f1f1f1;";
			
			document.getElementById("events").style = "display: none;";
			document.getElementById("methods").style = "display: block;";
		}
	}
	
	addCommand() {
		var command = app.methods.join(".");
		
		var p = document.createElement("p");
		p.innerText = command;
		
		document.getElementById("current-commands").appendChild(p);
		
		// Reset the method.
		app.methods = [];
		
		document.getElementById("drop-methods").innerHTML = "";
		
		this.addMethodDroppable();
		this.navigationUI.loadMethods(app.selectedEvent);
	}
	
}