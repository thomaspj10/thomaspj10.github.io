/*
  Stores information about a ListenerClass Class.
*/
class ListenerClass extends JavaClass {

  constructor(name, description, methods) {
    super(name, description, methods);
  }

}

class UserListenerClass extends ListenerClass {

  constructor(name, description, methods, id) {
    super(name, description, methods);

    this.id = id;
    this.commands = [];
  }

  getCommands() {
    return this.commands;
  }

  getId() {
    return this.id;
  }

}
