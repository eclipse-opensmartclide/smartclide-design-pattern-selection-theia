import {Attribute} from './Attribute';
export class Method {
	mName : string;
	rType : string;
	isAbstract : boolean;
	visibility : string;
	code : string;
	params: Array<Attribute>; 
	
	constructor(mn :string, rt: string, isA : boolean, v: string, c: string) {
		this.mName = mn;
		this.rType = rt;
		this.isAbstract = isA;
		this.visibility = v;
		this.code = c;
		this.params = [];
	}
	
	public writeToFile(): void {
		console.log("\t" + this.visibility + " ");
		if (this.isAbstract) 
			console.log("abstract " + this.rType + " " + this.mName + "(");
		else 
			console.log(this.rType + " " + this.mName + "(");
		for (let i=0; i<this.params.length;i++) {
			if (i==(this.params.length-1)) 
				this.params[i].writeAsParam();
			else {
				this.params[i].writeAsParam();
				console.log(", ");
			}
		}
		if (this.isAbstract) 
			console.log(");");
		else {
			console.log(") {");
			console.log(this.code);
			console.log("\t}");
		}
	}
}
