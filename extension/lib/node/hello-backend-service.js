"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HelloBackendServiceImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloBackendServiceImpl = void 0;
const inversify_1 = require("inversify");
const CodeGenerator_1 = require("./CodeGenerator");
let HelloBackendServiceImpl = HelloBackendServiceImpl_1 = class HelloBackendServiceImpl {
    constructor() {
        this.Path = require("path");
        this.FS = require("fs");
    }
    ThroughDirectory(Directory) {
        this.FS.readdirSync(Directory).forEach((File) => {
            var Absolute = this.Path.join(Directory, File);
            if (this.FS.statSync(Absolute).isDirectory())
                return this.ThroughDirectory(Absolute);
            else if (Absolute.endsWith(".java"))
                return HelloBackendServiceImpl_1.Files.push(File);
        });
    }
    async sayHelloTo(url) {
        //string manipulation to get the right form of url string
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL + 3);
        //search for every file name in textbox values
        //index=-1 if not found
        this.ThroughDirectory(rootUri);
        var res = HelloBackendServiceImpl_1.Files;
        HelloBackendServiceImpl_1.array = res;
        for (let i = 0; i < res.length; i++) {
            let lastW = res[i].lastIndexOf("/");
            let file = res[i].substr(lastW + 1);
            file = file.substr(0, file.indexOf("."));
            res[i] = file;
        }
        //fs
        //console.log(fs.readFileSync('C:/Users/test/Downloads/src/src/Main.java','utf8'));
        return new Promise(resolve => resolve(res));
    }
    async getMethods(url, fileName) {
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL + 3);
        var fs = require("fs");
        let lO = { label: [] };
        try {
            const data = fs.readFileSync(rootUri + "\\src\\" + fileName + ".java", 'utf8');
            const regex = new RegExp(/(?:(?:public|private|protected|static|final|native|synchronized|abstract|transient)+\s+)+[$_\w<>\[\]\s]*\s+[\$_\w]+\([^\)]*\)?\s*/gm);
            const array = [...data.matchAll(regex)];
            for (var i = 0; i < array.length; i++) {
                var firstString = (array[i].toString()).split('('); //?
                var secondString = (firstString[0].toString()).split(/\s+/);
                var item = secondString[secondString.length - 1];
                this.fillPromise(lO, item);
            }
        }
        catch (err) {
            console.error(err);
        }
        return new Promise(resolve => resolve(lO.label));
    }
    fillPromise(labelObj, item) {
        labelObj.label.push(item);
    }
    async codeGeneration(url, jsonObj, statePatternSelection) {
        let cg = new CodeGenerator_1.CodeGenerator();
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL + 3);
        let message = "";
        if (statePatternSelection == "AbstractFactory") {
            let ppc = cg.AbstractFactory(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Builder") {
            let ppc = cg.Builder(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "FactoryMethod") {
            let ppc = cg.FactoryMethod(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Prototype") {
            let ppc = cg.Prototype(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Singleton") {
            let ppc = cg.Singleton(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Adapter") {
            let ppc = cg.Adapter(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Bridge") {
            let ppc = cg.Bridge(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Composite") {
            let ppc = cg.Composite(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Decorator") {
            let ppc = cg.Decorator(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Facade") {
            let ppc = cg.Facade(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Flyweight") {
            let ppc = cg.Flyweight(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Proxy") {
            let ppc = cg.Proxy(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "ChainofResponsibility") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                ppc[i].writeToFile(rootUri);
            }
        }
        else if (statePatternSelection == "Command") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Interpreter") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Iterator") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Mediator") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Memento") {
            let ppc = cg.ChainofResponsibility(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Observer") {
            let ppc = cg.Observer(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "State") {
            let ppc = cg.State(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "Strategy") {
            let ppc = cg.Strategy(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else if (statePatternSelection == "TemplateMethod") {
            let ppc = cg.TemplateMethod(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        else {
            let ppc = cg.Visitor(jsonObj);
            for (let i = 0; i < ppc.length; i++) {
                message = ppc[i].writeToFile(rootUri);
                if (message != "")
                    return new Promise(resolve => resolve(message));
            }
        }
        return new Promise(resolve => resolve(message));
    }
};
HelloBackendServiceImpl.Files = [];
HelloBackendServiceImpl.index = -1;
HelloBackendServiceImpl = HelloBackendServiceImpl_1 = __decorate([
    inversify_1.injectable()
], HelloBackendServiceImpl);
exports.HelloBackendServiceImpl = HelloBackendServiceImpl;
//# sourceMappingURL=hello-backend-service.js.map