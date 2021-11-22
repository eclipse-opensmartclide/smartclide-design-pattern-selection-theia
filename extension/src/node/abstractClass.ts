import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(cName :string): void {
        const fs = require('fs');

        fs.appendFile(this.cName + ".java","public abstract class " + this.cName + " {", function(err: Error){
            if(err) console.log(err);
         });
		this.writeAttributes();
		this.writeMethods();
        fs.appendFile(this.cName + ".java","}", function(err: Error){
            if(err) console.log(err);
         });
         console.log(2);
    }
    
}