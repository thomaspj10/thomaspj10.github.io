/*
  The JavaMethod Class stores information about a Java Method.
*/

class JavaMethod {

  constructor(name, basicName, javaArguments, returnClass) {
    this.name = name;
    this.basicName = basicName;
    this.javaArguments = javaArguments;
    this.returnClass = returnClass;
  }

  getName() {
    return app.isAdvanced() ? this.name : this.basicName;
  }

  getMethodName() {
    return this.name;
  }

  getBasicName() {
    return this.basicName;
  }

  getArguments() {
    return this.javaArguments;
  }

  getReturnClass() {
    return this.returnClass;
  }

}
