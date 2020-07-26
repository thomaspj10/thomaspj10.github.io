class NavigationUI {
	
	constructor() {
		/*
			Add the events to the sidebar.
		*/
		for (var event of app.classManager.events) {
			var div = document.createElement("div");

			div.className = "draggable ui-event ui-widget-content";
			div.style = "background-color: e0e0e0;";

			div.innerHTML = "<b><p style='text-align: center'>" + event.event + "</b><br><small>" + event.description + "</small></p>";
			div.setAttribute("data-event", event.event);

			document.getElementById("events").appendChild(div);

			for (var i = 0; i < 4; i++) {
				var br = document.createElement("br");
				document.getElementById("events").appendChild(br);
			}
		}

		// Make the elements draggable.
		$(".ui-event").draggable({
			scroll: false,
			appendTo: "body",
			helper: "clone",
			revert: "invalid",
			revertDuration: 0,
			cursor: "move",
			containment: "document",
			zIndex: 10000,
			scroll: false,
			opacity: 0.8
		});
	}
	
	/* 
		Add the methods to the sidebar. 
	*/
	loadMethods(eventName, methodNames=[]) {
		// Clear the methods.
		document.getElementById("methods").innerHTML = "";
		
		// Get the path.
		var baseMethods = app.classManager.getMethodTree(eventName);
		
		for (var m of methodNames) {
			baseMethods = baseMethods[m];
		}
		
		// Load all the new methods.
		for (var method in baseMethods) {
			var div = document.createElement("div");
				
			div.className = "draggable ui-method ui-widget-content";
			div.style = "background-color: e0e0e0;";
				
			div.innerHTML = "<b><p style='text-align: center'>" + method + "</p></b>";
			div.setAttribute("data-method", method);
				
			document.getElementById("methods").appendChild(div);
			
			for (var i=0; i < 4; i++) {
				var br = document.createElement("br");
				document.getElementById("methods").appendChild(br);
			}
		}
		
		// Make the elements draggable.
		$(".ui-method").draggable({
			scroll: false,
			appendTo: "body",
			helper: "clone",
			revert: "invalid",
			revertDuration: 0,
			cursor: "move",
			containment: "document",
			zIndex: 10000,
			scroll: false,
			opacity: 0.8
		});
		
		if (Object.keys(baseMethods).length == 0) {
			return false;
		}
		
		return true;
	}
	
}