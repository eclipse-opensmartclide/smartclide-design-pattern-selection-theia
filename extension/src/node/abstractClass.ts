import {patternParticipatingClass} from './patternParticipatingClass';
export class abstractClass extends patternParticipatingClass{
    
    public writeToFile(): void {
        console.log("public abstract class " + this.cName + " {");
		this.writeAttributes();
		this.writeMethods();
		console.log("}");
    }
    
}