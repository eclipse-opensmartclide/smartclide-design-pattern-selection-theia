import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {

	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(): void {
		console.log("public class " + this.cName + " {");
		this.writeAttributes();
		this.writeMethods();
		console.log("}");
	}

}
