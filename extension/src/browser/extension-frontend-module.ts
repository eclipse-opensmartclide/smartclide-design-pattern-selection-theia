import { ContainerModule } from 'inversify';
import { extensionWidget } from './extension-widget';
import { extensionContribution } from './extension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { BackendClient, HelloBackendWithClientService, HelloBackendService, HELLO_BACKEND_PATH, HELLO_BACKEND_WITH_CLIENT_PATH } from '../common/protocol';
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

    bind(HelloBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<HelloBackendService>(HELLO_BACKEND_PATH);
    }).inSingletonScope();

    bind(HelloBackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const backendClient: BackendClient = ctx.container.get(BackendClient);
        return connection.createProxy<HelloBackendWithClientService>(HELLO_BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();

    
});