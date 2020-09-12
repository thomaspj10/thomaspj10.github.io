/*
  Loads and stores the classes and listeners from the /data/ directory.
  NOTE: This needs to be modified to implement the Premium features.
*/

class DataManager {

  constructor(callback) {
    this.classes = [];
    this.listeners = [];
    var self = this;

    this.readyCount = 0;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var json = JSON.parse(xhr.responseText);

        for (var c of json) {
          var javaMethods = [];

          for (var m of c.methods) {
            var javaArguments = [];

            for (var a of m.parameters) {
              var javaArgument = new JavaArgument(a.name, a.type, a.array);

              javaArguments.push(javaArgument);
            }

            var javaMethod = new JavaMethod(m.method, m.basicName, javaArguments, m.returns);

            javaMethods.push(javaMethod);
          }

          var javaClass = new JavaClass(c.name, c.description, javaMethods);

          self.classes.push(javaClass);
        }

        self.readyCount++;
        self.ready(callback);

      }
    }
    xhr.open("GET", "data/classes.json", true);
    xhr.send(null);

    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState == XMLHttpRequest.DONE) {
        var json = JSON.parse(xhr2.responseText);

        for (var c of json) {
          var javaMethods = [];

          for (var m of c.methods) {
            var javaArguments = [];

            for (var a of m.parameters) {
              var javaArgument = new JavaArgument(a.name, a.type, a.array);

              javaArguments.push(javaArgument);
            }

            var javaMethod = new JavaMethod(m.method, m.basicName, javaArguments, m.returns);

            javaMethods.push(javaMethod);
          }

          var listenerClass = new ListenerClass(c.name, c.description, javaMethods);

          self.listeners.push(listenerClass);
        }

        self.readyCount++;
        self.ready(callback);

      }
    }
    xhr2.open("GET", "data/listeners.json", true);
    xhr2.send(null);

  }

  ready(callback) {
    if (this.readyCount > 1) {
      callback();
      this.readyCount = 0;
    }
  }

  getClassByName(name) {
    for (var c of this.classes) {
      if (name == c.name) {
        return c;
      }
    }

    return;
  }

  hasClassByName(name) {
    for (var c of this.classes) {
      if (name == c.name) {
        return true;
      }
    }

    return false;
  }

}
