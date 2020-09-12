class UI {

  constructor() {

  }

  /*
    Get the html from a file and replaces it into the app.
  */
  setMenu(menu) {
    var self = this;
    Debug.log("Loading menu: " + menu);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            document.getElementById("app").innerHTML = xhr.responseText;

            switch(menu) {
              case "builder":
                self.builderUI = new BuilderUI(this);
                break;
            }

            Debug.log("Loaded menu: " + menu)
        }
    }
    xhr.open("GET", "pages/" + menu + ".html", true);
    xhr.send(null);
  }

  /*
    Gathers the Plugin information and creates the Plugin object.
  */
  createPlugin() {
    var pluginName = document.getElementById("app-PluginName").value;
    var pluginDescription = document.getElementById("app-PluginDescription").value;
    var pluginVersion = document.getElementById("app-PluginVersion").value;

    var feedback = document.getElementById("app-feedback");
    feedback.style = "text-align: center;color:red;";

    if (pluginName.length < 3) {
      feedback.innerText = "The Plugin name has to be 3 characters or longer.";
      return;
    }

    if (pluginDescription.length < 10) {
      feedback.innerText = "The Plugin description has to be 10 characters or longer.";
      return;
    }

    if (pluginVersion == "") {
      feedback.innerText = "The Plugin version is invalid.";
      return;
    }

    feedback.innerText = "";

    app.createPlugin(pluginName, pluginDescription, pluginVersion);
  }

}
