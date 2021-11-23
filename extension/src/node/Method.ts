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
		fs.appendFileSync(cName + ".java" ,"\n " + this.visibility + " ", function(err: Error){
			if(err) console.log(err);
		 });
        
		if (this.isAbstract){
			fs.appendFileSync(cName + ".java" ,"abstract " + this.rType + " " + this.mName + "(", function(err: Error){
				if(err) console.log(err);
			});
		}else {
			fs.appendFileSync(cName + ".java" ,this.rType + " " + this.mName + "(",
			function(err: Error){
				if(err) console.log(err);
			 });
		}
        
		for (let i=0; i<this.params.length;i++) {
			if (i==(this.params.length-1)) 
				this.params[i].writeAsParam(cName);
			else {
				this.params[i].writeAsParam(cName);
				fs.appendFileSync(cName + ".java",", ", function(err: Error){
					if(err) console.log(err);
				 });
			}
		}
		if (this.isAbstract) {
			console.log(1);
			fs.appendFileSync(cName + ".java" ,");",function(err: Error){
				if(err) console.log(err);
			 });
		}else {
			fs.appendFileSync(cName + ".java" ,") {", function(err: Error){
				if(err) console.log(err);
			});
			fs.appendFileSync(cName + ".java" ,"\n" + this.code + "\n", function(err: Error){
				if(err) console.log(err);
			 });
			fs.appendFileSync(cName + ".java" ,"\t}", function(err: Error){
				if(err) console.log(err);
			 });
			
		}
	
	}}
