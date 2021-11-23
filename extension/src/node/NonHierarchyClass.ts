import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');
		fs.appendFileSync(cName + ".java" ,"public class " + this.cName + " {",function(err: Error){
				if(err) console.log(err);
			 });
		this.writeAttributes();
		this.writeMethods();
		fs.appendFileSync(cName + ".java" ,"\n}",function(err: Error){
				if(err) console.log(err);
			 });
        
	}

}
