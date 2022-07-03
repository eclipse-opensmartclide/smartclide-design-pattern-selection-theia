/*******************************************************************************
 * Copyright (C) 2021-2022 University of Macedonia
 * 
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 * 
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
import { ContainerModule } from 'inversify';
import { extensionWidget } from './extension-widget';
import { extensionContribution } from './extension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { BackendClient, BackendWithClientService, BackendService, BACKEND_PATH, BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
import { WebSocketConnectionProvider } from "@theia/core/lib/browser";
import '../../src/browser/style/index.css';


export default new ContainerModule(bind => {
    bindViewContribution(bind, extensionContribution);
    bind(FrontendApplicationContribution).toService(extensionContribution);
    bind(extensionWidget).toSelf();

    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: extensionWidget.ID,
        createWidget: () => ctx.container.get<extensionWidget>(extensionWidget)
    })).inSingletonScope();

    bind(BackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<BackendService>(BACKEND_PATH);
    }).inSingletonScope();

    bind(BackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const backendClient: BackendClient = ctx.container.get(BackendClient);
        return connection.createProxy<BackendWithClientService>(BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();

    
});
