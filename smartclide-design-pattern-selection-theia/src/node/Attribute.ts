/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
export class Attribute {
	aName : string;
	type : string;
	visibility :string;
	
	constructor(an : string, t: string, v: string) {
		this.aName = an;
		this.type = t;
		this.visibility = v;
	}
	
	public writeToFile(cName : string, rootUri: string): void {
		var fs = require('fs');
		let filename = rootUri+"/src/"+cName + ".java";
		fs.appendFileSync(filename ,"\n \t" + this.visibility + " " + this.type + " " + this.aName + ";");

        
	}

	public writeAsParam(cName : string, rootUri : string) : void{
		var fs = require('fs');
		let filename = rootUri+"/src/"+cName + ".java";
		fs.appendFileSync(filename,this.type + " " + this.aName);
       
	}
	
}
