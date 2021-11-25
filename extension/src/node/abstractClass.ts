import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(): void {
        const fs = require('fs');

        fs.appendFileSync(this.cName + ".java","public abstract class " + this.cName + " {", function(err: Error){
            if(err) console.log(err);
         });
		this.writeAttributes();
		this.writeMethods();
        fs.appendFileSync(this.cName + ".java","\n}", function(err: Error){
            if(err) console.log(err);
         });
    }
    
}