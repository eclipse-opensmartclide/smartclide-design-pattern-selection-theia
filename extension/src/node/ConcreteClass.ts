import {patternParticipatingClass} from './patternParticipatingClass';
export class ConcreteClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc : string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(rootUri : string): void {
        var fs = require('fs');
		let filename = rootUri+"/"+this.cName + ".java";
        fs.open(filename,'r',(err: Error, data: string) =>{
			//if the file doesnt exist
            if (err) {
        		fs.appendFileSync(this.cName + ".java" , "public class " + this.cName + " extends " + this.superClass + " {");
				this.writeAttributes(rootUri);
				this.writeMethods(rootUri);
        		fs.appendFileSync(this.cName + ".java" , "\n}");
			}else{
				console.log(data);
                this.writeAttributes(rootUri);
                this.writeMethods(rootUri);
			}
		});
	}
}
