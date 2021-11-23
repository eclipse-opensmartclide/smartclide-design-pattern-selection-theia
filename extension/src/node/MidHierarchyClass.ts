import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(cName : string): void {
		var fs = require('fs');
		fs.appendFileSync(cName + ".java" ,"public abstract class " + this.cName + " extends " + this.superClass + " {",function(err: Error){
            if(err) console.log(err);
         });
       
		this.writeAttributes();
		this.writeMethods();
		fs.appendFileSync(cName + ".java" ,"}",function(err: Error){
				if(err) console.log(err);
			 });
       
	}

}
