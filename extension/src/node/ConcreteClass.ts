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
		fs.appendFileSync(filename, "public class " + this.cName + " extends " + this.superClass + " {");
		this.writeAttributes(rootUri);
		this.writeMethods(rootUri);
		fs.appendFileSync(filename , "\n}");
	}
}
