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
import { BackendClient, BackendWithClientService, BackendService, BACKEND_PATH, BACKEND_WITH_CLIENT_PATH } from "../common/protocol";
import { BackendWithClientServiceImpl } from "./backend-with-client-service";
import { BackendServiceImpl } from "./backend-service";

export default new ContainerModule(bind => {
    bind(BackendService).to(BackendServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler(BACKEND_PATH, () => {
            return ctx.container.get<BackendService>(BackendService);
        })
    ).inSingletonScope();

    bind(BackendWithClientService).to(BackendWithClientServiceImpl).inSingletonScope()
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<BackendClient>(BACKEND_WITH_CLIENT_PATH, client => {
            const server = ctx.container.get<BackendWithClientServiceImpl>(BackendWithClientService);
            server.setClient(client);
            client.onDidCloseConnection(() => server.dispose());
            return server;
        })
    ).inSingletonScope();
});
