import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');

        fs.writeFile(cName + ".java" ,"public abstract class " + this.cName + " extends " + this.superClass + " {");
		this.writeAttributes();
		this.writeMethods();
        fs.writeFile(cName + ".java" ,"}");
	}

}
