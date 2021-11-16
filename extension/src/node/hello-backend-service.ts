import { injectable, inject } from "inversify";
import { HelloBackendService } from "../common/protocol";
import {FileSearchService } from "@theia/file-search/lib/common/file-search-service";

interface LabeledValue{
	label:string[];
}


@injectable()
export class HelloBackendServiceImpl implements HelloBackendService {

    @inject(FileSearchService)
    protected readonly fileSearchService!:FileSearchService;
      
    static index = -1;
    static array: string[];

    async sayHelloTo(url: string): Promise<string[]> {
        //string manipulation to get the right form of url string
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL+3);
        //console.log(rootUri);

        //prepare file-search, define search pattern
        const roots: FileSearchService.RootOptions = {};
        //const rootUri = "C:\\Users\\test\\Downloads\\src\\src";
        roots[rootUri] = {};
        const opts: FileSearchService.Options = {
            rootOptions: roots
        };
        opts.includePatterns = ['**/*.java'];
       
        //search for every file name in textbox values
        //index=-1 if not found
        var res= await this.fileSearchService.find('',opts);
        HelloBackendServiceImpl.array = res;
        for (let i=0; i<res.length; i++){
            let lastW = res[i].lastIndexOf("/");
            let file = res[i].substr(lastW+1);
            file = file.substr(0, file.indexOf("."));
            res[i] = file;  
        }
        //fs
        //console.log(fs.readFileSync('C:/Users/test/Downloads/src/src/Main.java','utf8'));
        
        return new Promise<string[]>(resolve => resolve(res))
    }

    async getMethods(url: string, fileName: string): Promise<string[]>{
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL+3);
        var fs = require("fs");
        let lO = {label: []};
        try {
            const data = fs.readFileSync(rootUri+"\\src\\"+ fileName +".java", 'utf8')
            const regex = new RegExp(/(?:(?:public|private|protected|static|final|native|synchronized|abstract|transient)+\s+)+[$_\w<>\[\]\s]*\s+[\$_\w]+\([^\)]*\)?\s*/gm);
            const array = [...data.matchAll(regex)];
            console.log("ARRAY"+array);
           // var methodNames: PromiseLike<string[]>;
            
            for(var i = 0; i<array.length; i++){
                var firstString = (array[i].toString()).split('(');//?
                var secondString = (firstString[0].toString()).split(/\s+/);
                var item = secondString[secondString.length-1];
                this.fillPromise(lO, item); 
            }

            console.log("lO" + lO.label);
        } catch (err) {
            console.error(err)
          }
          return new Promise<string[]>(resolve => resolve(lO.label));
    }
    
    fillPromise(labelObj: LabeledValue, item: string){
        labelObj.label.push(item);
        
    }
    
    
    
}


