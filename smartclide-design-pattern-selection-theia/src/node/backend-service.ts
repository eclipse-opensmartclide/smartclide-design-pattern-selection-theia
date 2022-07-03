/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import { injectable } from "inversify";
import { BackendService } from "../common/protocol";
import { CodeGenerator } from "./codeGenerator";
import {patternParticipatingClass} from './patternParticipatingClass';
interface LabeledValue{
	label:string[];
}


@injectable()
export class BackendServiceImpl implements BackendService {
    
    Path = require("path");
    FS = require("fs");
    static Files : string[] = [];
    static absolutes : string[] = [];
    static index = -1;
    static array: string[];

    throughDirectory(Directory: string){
        this.FS.readdirSync(Directory).forEach((File: any) => {
            var Absolute = this.Path.join(Directory, File);
            if (this.FS.statSync(Absolute).isDirectory())
                return this.throughDirectory(Absolute);
            else if(Absolute.endsWith(".java")){
                BackendServiceImpl.absolutes.push(Absolute);
                return BackendServiceImpl.Files.push(File);
            }       
        });
    }

    async getFileNames(url: string): Promise<string[]> {
        //string manipulation to get the right form of url string
        var lastL = url.indexOf("/#/");
        var rootUri;
        if(url.match("\/#\/.:\/")){
            rootUri = url.substr(lastL+3);
        }
        else{
            rootUri = url.substr(lastL+2);
        }
        
        //search for every file name in textbox values
        //index=-1 if not found
        this.throughDirectory(rootUri);
        var res= BackendServiceImpl.Files;
        BackendServiceImpl.array = res;
        for (let i=0; i<res.length; i++){
            let lastW = res[i].lastIndexOf("/");
            let file = res[i].substr(lastW+1);
            file = file.substr(0, file.indexOf("."));
            res[i] = file;  
        }
        
        return new Promise<string[]>(resolve => resolve(res))
    }

    async getMethods( fileName: string): Promise<string[]>{
        var fs = require("fs");
        let lO = {label: []};
        var res= BackendServiceImpl.absolutes;
        var file=""
        res.forEach(element => {
            console.log(element)
           if (element.includes(fileName+".java"))
                file = element;
        });
        
        try {
            const data = fs.readFileSync( file , 'utf8')
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
        var rootUri;
        if(url.match("\/#\/.:\/")){
            rootUri = url.substr(lastL+3);
        }
        else{
            rootUri = url.substr(lastL+2);
        }
        let message = "";
        if(statePatternSelection == "AbstractFactory"){
            let ppc : Array<patternParticipatingClass> = cg.abstractFactory(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Builder"){
            let ppc : Array<patternParticipatingClass> = cg.builder(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "FactoryMethod"){
            let ppc : Array<patternParticipatingClass> = cg.factoryMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Prototype"){
            let ppc : Array<patternParticipatingClass> = cg.prototype(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Singleton"){
            let ppc : Array<patternParticipatingClass> = cg.singleton(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Adapter"){
            let ppc : Array<patternParticipatingClass> = cg.adapter(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Bridge"){
            let ppc : Array<patternParticipatingClass> = cg.bridge(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Composite"){
            let ppc : Array<patternParticipatingClass> = cg.composite(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Decorator"){
            let ppc : Array<patternParticipatingClass> = cg.decorator(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Facade"){
            let ppc : Array<patternParticipatingClass> = cg.facade(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Flyweight"){
            let ppc : Array<patternParticipatingClass> = cg.flyweight(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Proxy"){
            let ppc : Array<patternParticipatingClass> = cg.proxy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "ChainOfResponsibility"){
            let ppc : Array<patternParticipatingClass> = cg.chainOfResponsibility(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Command"){
            let ppc : Array<patternParticipatingClass> = cg.command(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        } if(statePatternSelection == "Mediator"){
            let ppc : Array<patternParticipatingClass> = cg.mediator(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Memento"){
            let ppc : Array<patternParticipatingClass> = cg.memento(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Observer"){
            let ppc : Array<patternParticipatingClass> = cg.observer(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "State"){
            let ppc : Array<patternParticipatingClass> = cg.state(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Strategy"){
            let ppc : Array<patternParticipatingClass> = cg.strategy(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "TemplateMethod"){
            let ppc : Array<patternParticipatingClass> = cg.templateMethod(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else if(statePatternSelection == "Visitor"){
            let ppc : Array<patternParticipatingClass> = cg.visitor(jsonObj);
            for (let i=0; i<ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if(message!="") return new Promise<string>(resolve => resolve(message));
            }
        }else {

        }
        return new Promise<string>(resolve=>resolve(message));
        
		
       

    }
}


