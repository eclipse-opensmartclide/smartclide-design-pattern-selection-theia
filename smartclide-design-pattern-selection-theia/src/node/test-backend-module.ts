/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import { ConnectionHandler, JsonRpcConnectionHandler } from "@theia/core";
import { ContainerModule } from "inversify";
import { BackendClient, HelloBackendWithClientService, HelloBackendService, HELLO_BACKEND_PATH, HELLO_BACKEND_WITH_CLIENT_PATH } from "../common/protocol";
import { HelloBackendWithClientServiceImpl } from "./hello-backend-with-client-service";
import { HelloBackendServiceImpl } from "./hello-backend-service";

export default new ContainerModule(bind => {
    bind(HelloBackendService).to(HelloBackendServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(HELLO_BACKEND_PATH, () => {
            return ctx.container.get<HelloBackendService>(HelloBackendService);
        })
    ).inSingletonScope();

    bind(HelloBackendWithClientService).to(HelloBackendWithClientServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<BackendClient>(HELLO_BACKEND_WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<HelloBackendWithClientServiceImpl>(HelloBackendWithClientService);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});
