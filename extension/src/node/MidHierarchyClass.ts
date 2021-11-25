import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(): void {
		var fs = require('fs');
		fs.appendFileSync(this.cName + ".java" ,"public abstract class " + this.cName + " extends " + this.superClass + " {",function(err: Error){
            if(err) console.log(err);
         });
       
		this.writeAttributes();
		this.writeMethods();
		fs.appendFileSync(this.cName + ".java" ,"}",function(err: Error){
				if(err) console.log(err);
			 });
       
	}

}
