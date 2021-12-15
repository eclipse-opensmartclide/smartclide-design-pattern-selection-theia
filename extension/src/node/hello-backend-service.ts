import { injectable, inject } from "inversify";
import { HelloBackendService } from "../common/protocol";
import {FileSearchService } from "@theia/file-search/lib/common/file-search-service";
import { CodeGenerator } from "./CodeGenerator";
import {patternParticipatingClass} from './patternParticipatingClass';
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
            for(var i = 0; i<array.length; i++){
                var firstString = (array[i].toString()).split('(');//?
                var secondString = (firstString[0].toString()).split(/\s+/);
                var item = secondString[secondString.length-1];
                this.fillPromise(lO, item); 
            }
        } catch (err) {
            console.error(err)
          }
          return new Promise<string[]>(resolve => resolve(lO.label));
    }
    
    fillPromise(labelObj: LabeledValue, item: string){
        labelObj.label.push(item);
        
    }
    
    
    
    async codeGeneration(url : string, jsonObj : string, statePatternSelection: string): Promise<string>{ 
        let cg : CodeGenerator  = new CodeGenerator();
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL+3);
        let message = "";
        if(statePatternSelection == "AbstractFactory"){
            let ppc : Array<patternParticipatingClass> = cg.AbstractFactory(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Builder"){
            let ppc : Array<patternParticipatingClass> = cg.Builder(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "FactoryMethod"){
            let ppc : Array<patternParticipatingClass> = cg.FactoryMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Prototype"){
            let ppc : Array<patternParticipatingClass> = cg.Prototype(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Singleton"){
            let ppc : Array<patternParticipatingClass> = cg.Singleton(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Adapter"){
            let ppc : Array<patternParticipatingClass> = cg.Adapter(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Bridge"){
            let ppc : Array<patternParticipatingClass> = cg.Bridge(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Composite"){
            let ppc : Array<patternParticipatingClass> = cg.Composite(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Decorator"){
            let ppc : Array<patternParticipatingClass> = cg.Decorator(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Facade"){
            let ppc : Array<patternParticipatingClass> = cg.Facade(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Flyweight"){
            let ppc : Array<patternParticipatingClass> = cg.Flyweight(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Proxy"){
            let ppc : Array<patternParticipatingClass> = cg.Proxy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "ChainofResponsibility"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                ppc[i].writeToFile(rootUri);
            }
        }else if(statePatternSelection == "Command"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Interpreter"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Iterator"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Mediator"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Memento"){
            let ppc : Array<patternParticipatingClass> = cg.ChainofResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Observer"){
            let ppc : Array<patternParticipatingClass> = cg.Observer(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "State"){
            let ppc : Array<patternParticipatingClass> = cg.State(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Strategy"){
            let ppc : Array<patternParticipatingClass> = cg.Strategy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "TemplateMethod"){
            let ppc : Array<patternParticipatingClass> = cg.TemplateMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else {
            let ppc : Array<patternParticipatingClass> = cg.Visitor(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }
        return new Promise<string>(resolve=>resolve(message));
        
		
       

    }
}


