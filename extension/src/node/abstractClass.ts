import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(rootUri : string): void {
        const fs = require('fs');
        let filename = rootUri+"/src/"+this.cName + ".java";
        fs.appendFileSync(filename,"public abstract class " + this.cName + " {");
        this.writeAttributes(rootUri);
        this.writeMethods(rootUri);
        fs.appendFileSync(filename,"\n}");
		
    }
    
}