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
		fs.appendFile(cName + ".java" ,"\n \t" + this.visibility + " ", function(err: Error){
			if(err) console.log(err);
		 });
        
		if (this.isAbstract){
			fs.appendFile(cName + ".java" ,"abstract " + this.rType + " " + this.mName + "(", function(err: Error){
				if(err) console.log(err);
			});
		}else {
			fs.appendFile(cName + ".java" ,this.rType + " " + this.mName + "(",
			function(err: Error){
				if(err) console.log(err);
			 });
		}
        
		for (let i=0; i<this.params.length;i++) {
			if (i==(this.params.length-1)) 
				this.params[i].writeAsParam(cName);
			else {
				this.params[i].writeAsParam(cName);
				fs.appendFile(cName + ".java",", ", function(err: Error){
					if(err) console.log(err);
				 });
			}
		}
		if (this.isAbstract) {
			console.log(1);
			fs.appendFile(cName + ".java" ,");",function(err: Error){
				if(err) console.log(err);
			 });
		}else {
			fs.appendFile(cName + ".java" ,") {", function(err: Error){
				if(err) console.log(err);
			});
			fs.appendFile(cName + ".java" ,this.code, function(err: Error){
				if(err) console.log(err);
			 });
			fs.appendFile(cName + ".java" ,"\t}", function(err: Error){
				if(err) console.log(err);
			 });
			
		}
	
	}}
