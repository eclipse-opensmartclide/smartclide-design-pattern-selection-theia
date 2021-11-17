import {patternParticipatingClass} from './patternParticipatingClass';
export class ConcreteClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc : string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(): void {
		console.log("public class " + this.cName + " extends " + this.superClass + " {");
		this.writeAttributes();
		this.writeMethods();
		console.log("}");
	}
	
}
