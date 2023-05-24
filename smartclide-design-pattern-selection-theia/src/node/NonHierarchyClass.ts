/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import { patternParticipatingClass } from "./patternParticipatingClass";
export class NonHierarchyClass extends patternParticipatingClass {
	constructor(cn : string) {
		super(cn);
	}

	public writeToFile(rootUri: string): string{
		var fs = require('fs');
		let filename = rootUri+"/src/"+this.cName + ".java";
		try{
            let fileContents = fs.readFileSync(filename,'utf-8');
            console.log("FileContents: "+fileContents);
           
            let declaration = fileContents.slice(0,fileContents.indexOf('{')+1);
            console.log("Declaration: "+declaration);

            let classBody = fileContents.slice(fileContents.indexOf('{')+2,fileContents.lastIndexOf('}'));
            console.log("ClassBody: "+classBody);

			if (this.hasArrayList) this.importArrayList(rootUri, declaration); // if the class has arrayList as an attribute

            fs.writeFileSync(filename,declaration);
            this.writeAttributes(rootUri);
            fs.appendFileSync(filename,"\n"+classBody);
            this.writeMethods(rootUri);
            fs.appendFileSync(filename,"\n}");
        }catch(err){
            if (err.code === 'ENOENT') {
                console.log('File not found!');
                try{
					if (this.hasArrayList) this.importArrayList(rootUri, ""); // if the class has arrayList as an attribute
					fs.appendFileSync(filename ,"public class " + this.cName + " {");
					this.writeAttributes(rootUri);
					this.writeMethods(rootUri);
					fs.appendFileSync(filename,"\n}");
				}catch(e){
					return (e as Error).message;
				}
			}else{
				return (err as Error).message;
			}
		}
		return "";
		
	}
	public importArrayList(rootUri: string, declaration: string): void {
		console.log(12);
		var fs = require("fs");
		let filename = rootUri+"/src/"+this.cName + ".java";
		if(!declaration.includes("import java.util.ArrayList;" || declaration==="")){
			fs.writeFileSync(filename, "import java.util.ArrayList;\n");
		}
	}


}
