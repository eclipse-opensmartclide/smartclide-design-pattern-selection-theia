import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(rootUri: string): void {
		var fs = require('fs');
		let filename = rootUri+"/src/"+this.cName + ".java";
		fs.appendFileSync(filename ,"public class " + this.cName + " {");
		this.writeAttributes(rootUri);
		this.writeMethods(rootUri);
		fs.appendFileSync(filename,"\n}");
	}

}
