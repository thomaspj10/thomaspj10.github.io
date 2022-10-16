/*
  The JavaClass Class stores information about a Java Class.
*/

class JavaClass {

  constructor(name, description, methods) {
    this.name = name;
    this.description = description;
    this.methods = methods;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getMethods() {
    return this.methods;
  }

}

class DefaultJavaClass extends JavaClass {

  constructor(name, description, methods) {
    super(name, description, methods);
  }

}
