import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(rootUri: string): string{
		var fs = require('fs');
		let filename = rootUri+"/src/"+this.cName + ".java";
		try{
			fs.appendFileSync(filename ,"public class " + this.cName + " {");
			this.writeAttributes(rootUri);
			this.writeMethods(rootUri);
			fs.appendFileSync(filename,"\n}");
		}catch(e){
			return (e as Error).message;
		}
		return "";
		
	}

}
