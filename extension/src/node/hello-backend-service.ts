import { injectable, inject } from "inversify";
import { HelloBackendService } from "../common/protocol";
import {FileSearchService } from "@theia/file-search/lib/common/file-search-service";
//import * as fs from 'fs';

@injectable()
export class HelloBackendServiceImpl implements HelloBackendService {

    @inject(FileSearchService)
    protected readonly fileSearchService!:FileSearchService;
      
    static index = -1;
    

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
                    
        //fs
        //console.log(fs.readFileSync('C:/Users/test/Downloads/src/src/Main.java','utf8'));

        return new Promise<string[]>(resolve => resolve(res));


    
    }
}
