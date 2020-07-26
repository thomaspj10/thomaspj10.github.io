class Method {
	
	name;
	parameters;
	returns;
	parent;
	
	constructor(name, description, parameters, returns, parent) {
		this.name = name;
		this.description = description;
		this.parameters = parameters;
		this.returns = returns;
		this.parent = parent;
	}
	
}