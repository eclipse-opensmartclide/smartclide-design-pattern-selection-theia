export class Attribute {
	aName : string;
	type : string;
	visibility :string;
	
	constructor(an : string, t: string, v: string) {
		this.aName = an;
		this.type = t;
		this.visibility = v;
	}
	
	public writeToFile(): void {
		console.log("\t" + this.visibility + " " + this.type + " " + this.aName + ";");
	}

	public writeAsParam() : void{
		console.log(this.type + " " + this.aName);
	}
	
}