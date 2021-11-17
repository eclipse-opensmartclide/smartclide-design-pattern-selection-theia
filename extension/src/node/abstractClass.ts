import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(cName :string): void {
        var fs = require('fs');

        fs.writeFile(this.cName + ".java" ,"public abstract class " + this.cName + " {");
		this.writeAttributes();
		this.writeMethods();
        fs.writeFile(this.cName + ".java" ,"}");
    }
    
}