import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(rootUri : string): string {
		var fs = require('fs');
		let filename = rootUri+"/src/"+this.cName + ".java";
		try{
			fs.appendFileSync(filename ,"public abstract class " + this.cName + " extends " + this.superClass + " {");
       		this.writeAttributes(rootUri);
			this.writeMethods(rootUri);
			fs.appendFileSync(filename ,"}");
		}catch(e){
			return (e as Error).message;
		}
		
		return "";
	}

}
