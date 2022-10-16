/*
  The JavaArgument Clas stores information about a Java Argument.
*/

class JavaArgument {

  constructor(name, argumentClass, isArray) {
    this.name = name;
    this.argumentClass = argumentClass;
    this.isArray = isArray;
  }

  getName() {
    return this.name;
  }

  getArgumentClass() {
    return this.argumentClass;
  }

  getIsArray() {
    return this.isArray;
  }

}

/*
  The UserArgument Class is used to store the JavaArgument, value and position data.
  This Class is only used to store data which the user filled in.
*/
class UserArgument extends JavaArgument {

  constructor(name, argumentClass, isArray, value, methodName, methodIndex) {
    super(name, argumentClass, isArray);

    this.value = value;
    this.methodName = methodName;
    this.methodIndex = methodIndex;
  }

  getValue() {
    return this.value;
  }

  getMethodName() {
    return this.methodName;
  }

  getMethodIndex() {
    return this.methodIndex;
  }

}
