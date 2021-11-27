import {patternParticipatingClass} from './patternParticipatingClass';
export class ConcreteClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc : string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(rootUri : string): void {
        var fs = require('fs');
		let filename = rootUri+"/src/"+this.cName + ".java";
		var fileContents;
		try {
  			fileContents = fs.readFileSync(filename);
		 	console.log(fileContents);
            this.writeAttributes(rootUri);
            this.writeMethods(rootUri);
		} catch (err) {
  			// Here you get the error when the file was not found,
  			// but you also get any other error
			fs.appendFileSync(filename, "public class " + this.cName + " extends " + this.superClass + " {");
			this.writeAttributes(rootUri);
			this.writeMethods(rootUri);
			fs.appendFileSync(this.cName + ".java" , "\n}");
		}
	}
}
