"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloBackendWithClientServiceImpl = void 0;
const inversify_1 = require("inversify");
let HelloBackendWithClientServiceImpl = class HelloBackendWithClientServiceImpl {
    greet() {
        return new Promise((resolve, reject) => this.client ? this.client.getName().then(greet => resolve('Hello ' + greet))
            : reject('No Client'));
    }
    dispose() {
        // do nothing
    }
    setClient(client) {
        this.client = client;
    }
};
HelloBackendWithClientServiceImpl = __decorate([
    inversify_1.injectable()
], HelloBackendWithClientServiceImpl);
exports.HelloBackendWithClientServiceImpl = HelloBackendWithClientServiceImpl;
//# sourceMappingURL=hello-backend-with-client-service.js.map