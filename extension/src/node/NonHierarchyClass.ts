import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');

        fs.writeFile(cName + ".java" ,"public class " + this.cName + " {");
		this.writeAttributes();
		this.writeMethods();
        fs.writeFile(cName + ".java" ,"}");
	}

}
