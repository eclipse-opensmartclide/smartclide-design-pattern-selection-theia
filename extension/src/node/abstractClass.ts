import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(rootUri : string): void {
        const fs = require('fs');
        let filename = rootUri+"/"+this.cName + ".java";
        fs.open(filename,'r',(err: Error, data: string) =>{
            if (err) {
                fs.appendFileSync(filename,"public abstract class " + this.cName + " {", function(err: Error){
                    if(err) console.log(err);
                 });
                 this.writeAttributes(rootUri);
                 this.writeMethods(rootUri);
                 fs.appendFileSync(filename,"\n}", function(err: Error){
                     if(err) console.log(err);
                  });
            } else {
                console.log(data);
                this.writeAttributes(rootUri);
                this.writeMethods(rootUri);
            }
           
        });
		
    }
    
}