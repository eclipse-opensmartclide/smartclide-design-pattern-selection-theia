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

            fs.writeFileSync(filename,declaration);
            this.writeAttributes(rootUri);
            fs.appendFileSync(filename,"\n"+classBody);
            this.writeMethods(rootUri);
            fs.appendFileSync(filename,"\n}");
        }catch(err){
            if (err.code === 'ENOENT') {
                console.log('File not found!');
                try{
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

}
