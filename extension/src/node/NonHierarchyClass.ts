import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');
		try{
			fs.appendFileSync(cName + ".java" ,"public class " + this.cName + " {");
		}catch(e){
			console.error(e);
		}
		this.writeAttributes();
		this.writeMethods();
		try{
			fs.appendFileSync(cName + ".java" ,"}");
		}catch(e){
			console.error(e);
		}
        
	}

}
