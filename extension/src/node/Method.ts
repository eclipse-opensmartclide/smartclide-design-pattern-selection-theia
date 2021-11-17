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
	
	public writeToFile(cName : string): void {
		var fs = require('fs');

        fs.writeFile(cName + ".java" ,"\t" + this.visibility + " ");
		if (this.isAbstract) 

        fs.writeFile(cName + ".java" ,"abstract " + this.rType + " " + this.mName + "(");
		else {

        fs.writeFile(cName + ".java" ,this.rType + " " + this.mName + "(");
		for (let i=0; i<this.params.length;i++) {
			if (i==(this.params.length-1)) 
				this.params[i].writeAsParam(cName);
			else {
				this.params[i].writeAsParam(cName);
				console.log(", ");
			}
		}
		if (this.isAbstract) 
			fs.writeFile(cName + ".java" ,");");
		else {

			fs.writeFile(cName + ".java" ,") {");

			fs.writeFile(cName + ".java" ,this.code);

			fs.writeFile(cName + ".java" ,"\t}");
		}
	}
	}}
