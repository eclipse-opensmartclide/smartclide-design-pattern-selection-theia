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

        fs.writeFile(cName + ".java" ,"\t" + this.visibility + " " + this.type + " " + this.aName + ";");
	}

	public writeAsParam(cName : string) : void{
		var fs = require('fs');

        fs.writeFile(cName + ".java" ,this.type + " " + this.aName);
	}
	
}