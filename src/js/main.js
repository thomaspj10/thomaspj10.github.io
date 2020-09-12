/* ---------- CONFIGURATION ---------- */
const DEBUG = true;

/* ---------- APP ---------- */
class App {

  constructor() {
    var self = this;

    // Check if the user has premium.
    // TODO.
    this.premium = false;

    // Set the mode of the Builder.
    this.advanced = true;

    // Create the UI.
    this.UI = new UI();

    var startTime = new Date().getTime();

    // Set the app state.
    this.setState(AppStateEnum.LOADING);

    // Load the classes and listeners.
    this.dataManager = new DataManager(function() {
      var endTime = new Date().getTime();
      var loadTime = endTime - startTime;

      // Ensure that the load time is always 3000ms. The loadtime might be higher if the internet speed of the user is very low.
      setTimeout(function() {
        // Remove the loader html because everything loaded.
        var loader = document.getElementById("loader-wrapper");
        loader.parentNode.removeChild(loader);

        // Set the new state of the App.
        self.setState(AppStateEnum.CREATE_PLUGIN);

        // Set the UI state.
        self.UI.setMenu("create_plugin");

      }, 0);//Math.max((3000 - loadTime), 0));
    });
  }

  setState(state) {
    this.state = state;

    Debug.log("Current App state: " + state);
  }

  getState() {
    return this.state;
  }

  hasPremium() {
    return this.premium;
  }

  isAdvanced() {
    return this.advanced;
  }

  createPlugin(name, description, version) {
    this.plugin = new MinecraftPlugin(name, description, version);
    this.setState(AppStateEnum.EDIT_PLUGIN);

    this.UI.setMenu("builder");
  }

  getPlugin() {
    return this.plugin;
  }

  getUI() {
    return this.UI;
  }

}

/* ---------- ENUMS ---------- */
const AppStateEnum = {
  "LOADING": 1
, "CREATE_PLUGIN": 2
, "EDIT_PLUGIN": 3};

AppStateEnum.__proto__.getKeyByValue = function (value) {
  return Object.keys(AppStateEnum).find(key => AppStateEnum[key] === value);
};

/* ---------- DEBUG ---------- */
class Debug {

  static log(value) {
    if (DEBUG) {
      console.log("[DEBUG] " + value);
      // TODO: Actualy log the debug.
    }
  }
}

/* ---------- SCREEN SIZE CHECK ---------- */
if (document.body.clientWidth < 800 || document.body.clientHeight < 600) {
  var smallScreenConfirm = confirm("You are using our application on a screen that is too small. We strongly recommend to switch to a larger screen for a better performance.");
}

var app = new App();
