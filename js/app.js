class Debug {
	
	static log(str) {
		console.log("[LOG] " + str);
	}
	
	static warn(str) {
		console.log("[WARN] " + str);
	}
	
	static error(str) {
		console.log("[ERROR] " + str);
	}
	
}

class App {
	
	name;
	description;
	version;
	
	classManager;
	pluginManager;
	
	ui;
	
	// Store data about the current event which is being made.
	selectedEvent;
	methods = [];
	
	constructor(name, description, version) {
		this.name = name;
		this.description = description;
		this.version = version;
	}
	
	/*
		Load the app.
	*/
	load() {
		var self = this;
		
		// Load all the scripts.
		this.loadScript("./js/javadocs/class.js");
		this.loadScript("./js/javadocs/event.js");
		
		this.loadScript("./js/javadocs/method.js");
		
		this.loadScript("./js/javadocs/classManager.js").onload = function() {
			self.classManager = new ClassManager();
		}
		
		this.loadScript("./js/data/pluginManager.js").onload = function() {
			self.pluginManager = new PluginManager();
		}
		
		this.loadScript("./js/data/command.js");
		this.loadScript("./js/data/eventData.js");
		
		this.loadScript("./js/ui/ui.js").onload = function() {
			self.ui = new UI(self);
		}
		
		this.loadScript("./js/ui/navigationUI.js");
	}
	
	/*
		Load a html file into the site. 
	*/
	loadPage(page, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status != 200) {
					Debug.error("There was an error while trying to load the page " + page + ".html Status: " + xhr.status);
					document.getElementById("app").innerHTML = "<p>There was an error while trying to load this page.</p>";
					
					return;
				}
				
				document.getElementById("app").innerHTML = xhr.responseText;
				callback();
			}
		}
		xhr.open('GET', page, true);
		xhr.send(null);
	}
	
	/*
		Load a Javascript file into the site.
	*/
	loadScript(url) {
		var script = document.createElement("script");
		
		script.src = url + "?time=" + Date.now();
		document.head.appendChild(script);
		
		return script;
	}
	
}

// const app = new App("Plugin Name", "desc");