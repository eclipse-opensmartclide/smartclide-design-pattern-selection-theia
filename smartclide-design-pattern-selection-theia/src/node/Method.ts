/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import {Attribute} from './attribute';
export class Method {
	mName : string;
	rType : string;
	isAbstract : boolean;
	visibility : string;
	code : string;
	params: Array<Attribute>; 
	
	constructor(mn :string, rt: string, isA : boolean, v: string, c: string, params : Array<Attribute>) {
		this.mName = mn;
		this.rType = rt;
		this.isAbstract = isA;
		this.visibility = v;
		this.code = c;
		this.params = params;
	}
	
	public writeToFile(cName : string, rootUri : string): void {
		var fs = require('fs');
		let filename = rootUri+"/src/"+cName + ".java";
		fs.appendFileSync(filename ,"\n \t" + this.visibility + " ");
        
		if (this.isAbstract){
			fs.appendFileSync(filename ,"abstract " + this.rType + " " + this.mName + "(");
		}else {
			fs.appendFileSync(filename ,this.rType + " " + this.mName + "(");
		}
        
		for (let i=0; i<this.params.length;i++) {
			if (i==(this.params.length-1)) 
				this.params[i].writeAsParam(cName, rootUri);
			else {
				this.params[i].writeAsParam(cName, rootUri);
				fs.appendFileSync(filename,", ");
			}
		}
		if (this.isAbstract) {
			fs.appendFileSync(filename ,");");
		}else {
			fs.appendFileSync(filename ,") {");
			fs.appendFileSync(filename ,"\n " + this.code + "\n");
			fs.appendFileSync(filename ,"\t}");
			
		}
	
	}}
