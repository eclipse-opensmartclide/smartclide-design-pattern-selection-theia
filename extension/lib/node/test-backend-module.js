"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@theia/core");
const inversify_1 = require("inversify");
const protocol_1 = require("../common/protocol");
const hello_backend_with_client_service_1 = require("./hello-backend-with-client-service");
const hello_backend_service_1 = require("./hello-backend-service");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(protocol_1.HelloBackendService).to(hello_backend_service_1.HelloBackendServiceImpl).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(ctx => new core_1.JsonRpcConnectionHandler(protocol_1.HELLO_BACKEND_PATH, () => {
        return ctx.container.get(protocol_1.HelloBackendService);
    })).inSingletonScope();
    bind(protocol_1.HelloBackendWithClientService).to(hello_backend_with_client_service_1.HelloBackendWithClientServiceImpl).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(ctx => new core_1.JsonRpcConnectionHandler(protocol_1.HELLO_BACKEND_WITH_CLIENT_PATH, client => {
        const server = ctx.container.get(protocol_1.HelloBackendWithClientService);
        server.setClient(client);
        client.onDidCloseConnection(() => server.dispose());
        return server;
    })).inSingletonScope();
});
//# sourceMappingURL=test-backend-module.js.map