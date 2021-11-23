import {patternParticipatingClass} from './patternParticipatingClass';
export class ConcreteClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc : string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(cName : string): void {
        var fs = require('fs');

        fs.appendFileSync(this.cName + ".java" , "public class " + this.cName + " extends " + this.superClass + " {");
		this.writeAttributes();
		this.writeMethods();
        fs.appendFileSync(this.cName + ".java" , "\n}");
	}
	
}
