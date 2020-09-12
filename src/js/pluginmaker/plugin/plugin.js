/*
  The Plugin Class stores information general information about the current Plugin.
*/

class MinecraftPlugin {

  constructor(pluginName, description, pluginVersion) {
    this.pluginName = pluginName;
    this.description = description;
    this.pluginVersion = pluginVersion;

    this.pluginData = new PluginData();

    this.selectedListenerClass = "";
    this.selectedListenerClassId = "";
    this.lastSelectedClass = "";

    this.currentCommand = [];
    this.currentCommands = [];
  }

  getPluginName() {
    return this.pluginName;
  }

  getDescripton() {
    return this.description;
  }

  getPluginVersion() {
    return this.pluginVersion;
  }

  getPluginData() {
    return this.pluginData;
  }

  getSelectedListenerClass() {
    return this.selectedListener;
  }

  setSelectedListenerClass(selectedListener) {
    this.selectedListener = selectedListener;
    this.setLastSelectedClass(selectedListener);
    this.selectedListenerClassId = Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8);

    // Add the Listener to the PluginData.
    for (var l of app.dataManager.listeners) {
      if (l.getName() == selectedListener) {
        var listener = new UserListenerClass(l.getName(), l.getDescription(), l.getMethods(), this.selectedListenerClassId);
        this.pluginData.getListeners().push(listener);
      }
    }
  }

  getLastSelectedClass() {
    return this.lastSelectedClass;
  }

  getLastSelectedListenerClassId() {
    return this.selectedListenerClassId;
  }

  setLastSelectedClass(lastSelectedClass) {
    this.lastSelectedClass = lastSelectedClass;
  }

  getCurrentCommand() {
    return this.currentCommand;
  }

  setCurrentCommand(currentCommand) {
    this.currentCommand = currentCommand;
  }

  addToCurrentCommand(newCommand) {
    this.currentCommand.push(newCommand);
  }

  getFormattedCurrentCommand() {
    var formattedCurrentCommand = "";

    for (var m of this.currentCommand) {
      var args = "";

      for (var a of m.getArguments()) {
        args += a.getName() + " ";
      }

      args = args.substring(0, args.length - 1);

      formattedCurrentCommand += "." + m.getName() + "(" + args + ")\n";
    }

    return formattedCurrentCommand.substring(0, formattedCurrentCommand.length - 1);
  }

  getCurrentCommands() {
    return this.currentCommands;
  }

}

const PluginVersionEnum = {"minecraft18": "1.8"};
