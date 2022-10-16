class BuilderUI {

  constructor(UI) {
    this.UI = UI;
    var self = this;

    /*
      Define the event listeners.
    */
    document.getElementById("app-listeners-button").onclick = function() {
      self.loadListenersList();
    };
    document.getElementById("app-functions-button").onclick = function() {
      self.loadFunctionsList(app.plugin.getLastSelectedClass());
    };
    document.getElementById("app-inventories-button").onclick = function() {
      // TODO.
    };

    document.getElementById("app-addCommand").onclick = function() {
      self.addCommand();
    };

    document.getElementById("save-listenerData").onclick = function() {
      for (var l of app.plugin.pluginData.getListeners()) {
        if (l.getId() == app.plugin.getLastSelectedListenerClassId()) {
          l.commands = app.plugin.getCurrentCommands();

          self.resetBuilder();
        }
      }
    };

    this.loadListenersList();
  }

  /*
    Loads the Listeners into the sidebar.
  */
  loadListenersList() {
    var self = this;

    document.getElementById("app-list").innerHTML = "";

    for (var l of app.dataManager.listeners) {
      var div = document.createElement("div");

      var h3 = document.createElement("h3");
      var p = document.createElement("p");
      var btn = document.createElement("button");

      h3.innerText = l.getName();
      p.innerText = l.getDescription();
      btn.innerText = "Add to Builder";
      btn.setAttribute("data-classname", l.getName());
      btn.style = "width: 50%;";

      div.style = "border-style: solid; border-width: 1px;margin: 5px;padding: 2px;";

      btn.addEventListener("click", function(e) {
        self.resetBuilder(false);

        // Set the selected class name.
        var className = e.target.getAttribute("data-classname");

        app.plugin.setSelectedListenerClass(className);
        app.plugin.setCurrentCommand([]);

        document.getElementById("app-selectedListener").innerText = className;
        document.getElementById("app-getCurrentCommand").innerText = "No Command";
        document.getElementById("app-currentCommandArguments").innerHTML = "";

        // Update the UI acordingly.
        self.loadFunctionsList(app.plugin.getSelectedListenerClass());
      });

      div.className = "list-item";

      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(btn);

      document.getElementById("app-list").appendChild(div);
    }
  }

  /*
    Loads the functions from a Class into the sidebar.
  */
  loadFunctionsList(className) {
    var self = this;
    document.getElementById("app-list").innerHTML = "";

    var array = app.dataManager.classes.concat(app.dataManager.listeners);
    for (var c of array) {
      if (c.getName() != className) {
        continue;
      }

      for (var m of c.methods) {
        var div = document.createElement("div");

        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        var btn = document.createElement("button");

        btn.style = "width: 50%;";

        div.style = "border-style: solid; border-width: 1px;margin: 5px;padding: 2px;";

        // Create the argument list.
        var argumentList = "";
        for (var a of m.getArguments()) {
          argumentList += " " + a.getName();
        }

        h3.innerText = m.getName();
        p.innerText = argumentList;
        btn.innerText = "Add to Builder";
        btn.setAttribute("data-methodname", m.getName());

        btn.addEventListener("click", function(e) {
          // Set the selected method name.
          var methodName = e.target.getAttribute("data-methodname");

          var array = app.dataManager.classes.concat(app.dataManager.listeners);
          for (var c of array) {
            if (c.getName() != app.plugin.getLastSelectedClass()) {
              continue;
            }

            for (var m of c.getMethods()) {
              if (m.getName() != methodName) {
                continue;
              }

              // Update the side list.
              self.loadFunctionsList(m.getReturnClass());

              app.plugin.setLastSelectedClass(m.getReturnClass());
              app.plugin.addToCurrentCommand(m);
            }

            // Update the arguments.
            var index = 0;
            document.getElementById("app-currentCommandArguments").innerHTML = "";

            for (var commandMethod of app.plugin.getCurrentCommand()) {
              for (var commandArgument of commandMethod.getArguments()) {
                var input = document.createElement("input");
                input.type = "text";
                input.placeholder = commandArgument.getName();
                input.autocomplete = "off";

                input.setAttribute("data-argumentName", commandArgument.getName());
                input.setAttribute("data-argumentClass", commandArgument.getArgumentClass());
                input.setAttribute("data-argumentIsArray", commandArgument.getIsArray());

                input.setAttribute("data-methodName", commandMethod.getMethodName());
                input.setAttribute("data-methodIndex", index);

                document.getElementById("app-currentCommandArguments").appendChild(input);
              }

              index++;
            }

            // Add the method list to the screen.
            document.getElementById("app-getCurrentCommand").innerText = app.plugin.getFormattedCurrentCommand();
          }
        });

        div.className = "list-item";

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(btn);

        document.getElementById("app-list").appendChild(div);
      }
    }
  }

  /*
    Loads the list of Inventories into the sidebar.
  */
  loadInventoriesList() {
    // TODO:
  }

  /*
    Add a Command and it's data to the plugin.
  */
  addCommand() {
    if (app.plugin.getCurrentCommand().length == 0) {
      return;
    }

    var methods = app.plugin.getCurrentCommand();
    var userArguments = [];

    for (var argument of document.getElementById("app-currentCommandArguments").children) {
      var argumentName = argument.getAttribute("data-argumentName");
      var argumentClass = argument.getAttribute("data-argumentClass");
      var argumentIsArray = (argument.getAttribute("data-argumentIsArray") == "true");
      var argumentValue = argument.value;

      var methodName = argument.getAttribute("data-methodName");
      var methodIndex = parseInt(argument.getAttribute("data-methodIndex"));

      var userArgument = new UserArgument(argumentName, argumentClass, argumentIsArray, argumentValue, methodName, methodIndex);
      userArguments.push(userArgument);
    }

    var command = new Command(methods, userArguments);

    app.plugin.currentCommands.push(command);

    // Reset the editor.
    document.getElementById("app-getCurrentCommand").innerHTML = "";
    document.getElementById("app-currentCommandArguments").innerHTML = "";

    app.plugin.setCurrentCommand([]);
    app.plugin.setLastSelectedClass(app.plugin.getSelectedListenerClass());

    this.loadFunctionsList(app.plugin.getSelectedListenerClass());

    // Add the commands to the builder.
    this.showCommands();
  }

  /*
   Shows all the command in the builder.
  */
  showCommands() {
    var self = this;

    // Add the commands to the editor.
    document.getElementById("app-commands").innerHTML = "";

    var index = 0;
    for (var command of app.plugin.getCurrentCommands()) {
      var methodString = "";
      for (var method of command.getMethods()) {
        methodString += "." + method.getName() + "()";
      }

      methodString = methodString.substring(1, methodString.length);

      var div = document.createElement("div");
      var h4 = document.createElement("h4");
      var btnUp = document.createElement("span");
      var btnDown = document.createElement("span");
      var btnDelete = document.createElement("span");

      div.setAttribute("data-index", index);
      div.id = "command-" + index;

      var id = "arrow-button-" + index;

      h4.innerText = methodString;
      h4.innerHTML = h4.innerHTML + " " +
      "<span class='arrow-button " + id + "' data-type='up'>&#8593;</span> " + " " +
      "<span class='arrow-button " + id + "' data-type='down'>&#8595;</span>" + " " +
      "<span class='button-x'>&times;</span>";

      div.appendChild(h4);
      document.getElementById("app-commands").appendChild(div);

      for (var ele of document.getElementsByClassName("arrow-button-" + index)) {
        ele.onclick = function(e) {
          var target = e.target;
          var type = target.getAttribute("data-type");

          // Check if this element can actualy switch.
          var index = parseInt(target.parentNode.parentNode.getAttribute("data-index"));

          if (type == "up" && index == 0) {
            return;
          }

          if (type == "down" && index == (app.plugin.currentCommands.length - 1)) {
            return;
          }

          var commandElements = document.getElementById("app-commands").childNodes;

          if (type == "up") {
            var tmp = app.plugin.currentCommands[index];
            app.plugin.currentCommands[index] = app.plugin.currentCommands[(index - 1)];
            app.plugin.currentCommands[(index - 1)] = tmp;

            self.showCommands();
          }

          if (type == "down") {
            var tmp = app.plugin.currentCommands[index];
            app.plugin.currentCommands[index] = app.plugin.currentCommands[(index + 1)];
            app.plugin.currentCommands[(index + 1)] = tmp;

            self.showCommands();
          }
        }
      }
      index++;
    }

    for (var ele of document.getElementsByClassName("button-x")) {
      ele.onclick = function(e) {
        var target = e.target;
        var parent = target.parentNode.parentNode;

        var index = parseInt(parent.getAttribute("data-index"));

        parent.innerHTML = "";
        app.plugin.currentCommands.splice(index, 1);
      }
    }

  }

  /*
    Resets the builder to its default state.
  */
  resetBuilder(LoadListenersList=true) {
    document.getElementById("app-selectedListener").innerHTML = "No Listener Selected.";
    document.getElementById("app-getCurrentCommand").innerHTML = "No Command.";
    document.getElementById("app-list").innerHTML = "";
    document.getElementById("app-currentCommandArguments").innerHTML = "";
    document.getElementById("app-commands").innerHTML = "";

    app.plugin.currentCommand = [];
    app.plugin.currentCommands = [];

    if (LoadListenersList) {
      this.loadListenersList();
    }
  }

}
