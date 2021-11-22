import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');
		try {
			fs.appendFileSync(cName + ".java" ,"public abstract class " + this.cName + " extends " + this.superClass + " {");
		} catch(e) {
			console.error(e);
		}
       
		this.writeAttributes();
		this.writeMethods();
		try{
			fs.appendFileSync(cName + ".java" ,"}");
		} catch(e) {
			console.error(e);
		}
       
	}

}
