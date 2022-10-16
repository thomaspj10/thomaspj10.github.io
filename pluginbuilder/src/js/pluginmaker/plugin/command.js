/*
  The Command Class stores information about a command.
*/

class Command {

  constructor(methods, userArguments) {
    this.methods = methods;
    this.userArguments = userArguments;
  }

  getMethods() {
    return this.methods;
  }

  getUserArguments() {
    return this.userArguments;
  }

}
