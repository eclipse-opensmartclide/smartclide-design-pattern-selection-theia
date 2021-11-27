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
		var fileContents;
		try {
  			fileContents = fs.readFileSync(filename);
			//splits the file content at the first occurence of "{"
			 var array = fileContents.split('{',1);
			 console.log(array[1])
			 fs.appendFileSync(filename ,array[0]+"\n " + this.visibility + " " + this.type + " " + this.aName + ";"+array[1]);
		} catch (err) {
  			// Here you get the error when the file was not found,
  			// but you also get any other error
			fs.appendFileSync(filename ,"\n " + this.visibility + " " + this.type + " " + this.aName + ";");
		}
		
		
        
	}

	public writeAsParam(cName : string, rootUri : string) : void{
		var fs = require('fs');
		fs.appendFileSync(cName + ".java" ,this.type + " " + this.aName, function(err: Error){
			if(err) console.log(err);
		});
       
	}
	
}