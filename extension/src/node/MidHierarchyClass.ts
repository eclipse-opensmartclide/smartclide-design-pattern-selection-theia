import {patternParticipatingClass} from './patternParticipatingClass';
export class MidHierarchyClass extends patternParticipatingClass {
	superClass : string;
	
	constructor(cn : string, sc: string) {
		super(cn);
		this.superClass = sc;
	}

	public writeToFile(): void {
		console.log("public abstract class " + this.cName + " extends " + this.superClass + " {");
		this.writeAttributes();
		this.writeMethods();
		console.log("}");
	}

}
