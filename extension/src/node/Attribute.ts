export class Attribute {
	aName : string;
	type : string;
	visibility :string;
	
	constructor(an : string, t: string, v: string) {
		this.aName = an;
		this.type = t;
		this.visibility = v;
	}
	
	public writeToFile(cName : string): void {
		var fs = require('fs');
		fs.appendFileSync(cName + ".java" ,"\n " + this.visibility + " " + this.type + " " + this.aName + ";", function(err: Error){
			if(err) console.log(err);
		});
		
        
	}

	public writeAsParam(cName : string) : void{
		var fs = require('fs');
		fs.appendFileSync(cName + ".java" ,this.type + " " + this.aName, function(err: Error){
			if(err) console.log(err);
		});
       
	}
	
}