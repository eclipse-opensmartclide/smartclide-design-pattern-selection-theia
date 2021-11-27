import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(rootUri: string): void {
		var fs = require('fs');
		fs.appendFileSync(this.cName + ".java" ,"public class " + this.cName + " {",function(err: Error){
				if(err) console.log(err);
			 });
		this.writeAttributes(rootUri);
		this.writeMethods(rootUri);
		fs.appendFileSync(this.cName + ".java" ,"\n}",function(err: Error){
				if(err) console.log(err);
			 });
        
	}

}
