"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloBackendServiceImpl = void 0;
const inversify_1 = require("inversify");
const file_search_service_1 = require("@theia/file-search/lib/common/file-search-service");
//import * as fs from 'fs';
let HelloBackendServiceImpl = class HelloBackendServiceImpl {
    async sayHelloTo(url) {
        //string manipulation to get the right form of url string
        var lastL = url.indexOf("/#/");
        var rootUri = url.substr(lastL + 3);
        //console.log(rootUri);
        //prepare file-search, define search pattern
        const roots = {};
        //const rootUri = "C:\\Users\\test\\Downloads\\src\\src";
        roots[rootUri] = {};
        const opts = {
            rootOptions: roots
        };
        opts.includePatterns = ['**/*.java'];
        //search for every file name in textbox values
        //index=-1 if not found
        var res = await this.fileSearchService.find('', opts);
        //fs
        //console.log(fs.readFileSync('C:/Users/test/Downloads/src/src/Main.java','utf8'));
        console.log("BACK " + res);
        return new Promise(resolve => resolve(res));
    }
};
HelloBackendServiceImpl.index = -1;
__decorate([
    inversify_1.inject(file_search_service_1.FileSearchService),
    __metadata("design:type", Object)
], HelloBackendServiceImpl.prototype, "fileSearchService", void 0);
HelloBackendServiceImpl = __decorate([
    inversify_1.injectable()
], HelloBackendServiceImpl);
exports.HelloBackendServiceImpl = HelloBackendServiceImpl;
//# sourceMappingURL=hello-backend-service.js.map