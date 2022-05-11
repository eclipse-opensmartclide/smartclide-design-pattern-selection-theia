import { injectable } from "inversify";
import { HelloBackendService } from "../common/protocol";
import { CodeGenerator } from "./CodeGenerator";
import {patternParticipatingClass} from './patternParticipatingClass';
interface LabeledValue{
	label:string[];
}


@injectable()
export class HelloBackendServiceImpl implements HelloBackendService {
    
    Path = require("path");
    FS = require("fs");
    static Files : string[] = [];

    static index = -1;
    static array: string[];

    ThroughDirectory(Directory: string){
        this.FS.readdirSync(Directory).forEach((File: any) => {
            var Absolute = this.Path.join(Directory, File);
            if (this.FS.statSync(Absolute).isDirectory())
                return this.ThroughDirectory(Absolute);
            else if(Absolute.endsWith(".java"))
                return HelloBackendServiceImpl.Files.push(File);
        });
    }

    async sayHelloTo(url: string): Promise<string[]> {
        this.ThroughDirectory(url);
        var res= HelloBackendServiceImpl.Files;
        HelloBackendServiceImpl.array = res;
        for (let i=0; i<res.length; i++){
            let lastW = res[i].lastIndexOf("/");
            let file = res[i].substr(lastW+1);
            file = file.substr(0, file.indexOf("."));
            console.log(file);
            res[i] = file;  
        }
        
        return new Promise<string[]>(resolve => resolve(res))
    }

    async getMethods(url: string, fileName: string): Promise<string[]>{
        var fs = require("fs");
        let lO = {label: []};
        try {
            const data = fs.readFileSync(url+"/src/"+ fileName +".java", 'utf8')
            const regex = new RegExp(/(?:(?:public|private|protected|static|final|native|synchronized|abstract|transient)+\s+)+[$_\w<>\[\]\s]*\s+[\$_\w]+\([^\)]*\)?\s*/gm);
            const array = [...data.matchAll(regex)];
            for(var i = 0; i<array.length; i++){
                var firstString = (array[i].toString()).split('(');
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
        let message = "";
        if(statePatternSelection == "AbstractFactory"){
            let ppc : Array<patternParticipatingClass> = cg.AbstractFactory(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Builder"){
            let ppc : Array<patternParticipatingClass> = cg.Builder(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "FactoryMethod"){
            let ppc : Array<patternParticipatingClass> = cg.FactoryMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Prototype"){
            let ppc : Array<patternParticipatingClass> = cg.Prototype(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Singleton"){
            let ppc : Array<patternParticipatingClass> = cg.Singleton(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Adapter"){
            let ppc : Array<patternParticipatingClass> = cg.Adapter(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Bridge"){
            let ppc : Array<patternParticipatingClass> = cg.Bridge(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Composite"){
            let ppc : Array<patternParticipatingClass> = cg.Composite(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Decorator"){
            let ppc : Array<patternParticipatingClass> = cg.Decorator(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Facade"){
            let ppc : Array<patternParticipatingClass> = cg.Facade(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Flyweight"){
            let ppc : Array<patternParticipatingClass> = cg.Flyweight(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Proxy"){
            let ppc : Array<patternParticipatingClass> = cg.Proxy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "ChainOfResponsibility"){
            let ppc : Array<patternParticipatingClass> = cg.ChainOfResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Command"){
            let ppc : Array<patternParticipatingClass> = cg.Command(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        } if(statePatternSelection == "Mediator"){
            let ppc : Array<patternParticipatingClass> = cg.Mediator(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Memento"){
            let ppc : Array<patternParticipatingClass> = cg.Memento(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Observer"){
            let ppc : Array<patternParticipatingClass> = cg.Observer(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "State"){
            let ppc : Array<patternParticipatingClass> = cg.State(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Strategy"){
            let ppc : Array<patternParticipatingClass> = cg.Strategy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "TemplateMethod"){
            let ppc : Array<patternParticipatingClass> = cg.TemplateMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Visitor"){
            let ppc : Array<patternParticipatingClass> = cg.Visitor(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(url);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else {

        }
        return new Promise<string>(resolve=>resolve(message));
        
		
       

    }
}


