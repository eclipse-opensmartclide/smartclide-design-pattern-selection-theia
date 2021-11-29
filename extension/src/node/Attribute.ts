export class Attribute {
	aName : string;
	type : string;
	visibility :string;
	
	constructor(an : string, t: string, v: string) {
		this.aName = an;
		this.type = t;
		this.visibility = v;
	}
	
	public writeToFile(cName : string, rootUri: string): void {
		var fs = require('fs');
		let filename = rootUri+"/src/"+cName + ".java";
		fs.appendFileSync(filename ,"\n " + this.visibility + " " + this.type + " " + this.aName + ";");

        
	}

	public writeAsParam(cName : string, rootUri : string) : void{
		var fs = require('fs');
		let filename = rootUri+"/src/"+cName + ".java";
		fs.appendFileSync(filename,this.type + " " + this.aName);
       
	}
	
}