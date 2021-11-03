"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const extension_widget_1 = require("./extension-widget");
const extension_contribution_1 = require("./extension-contribution");
const browser_1 = require("@theia/core/lib/browser");
const protocol_1 = require("../common/protocol");
const browser_2 = require("@theia/core/lib/browser");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    browser_1.bindViewContribution(bind, extension_contribution_1.extensionContribution);
    bind(browser_1.FrontendApplicationContribution).toService(extension_contribution_1.extensionContribution);
    bind(extension_widget_1.extensionWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: extension_widget_1.extensionWidget.ID,
        createWidget: () => ctx.container.get(extension_widget_1.extensionWidget)
    })).inSingletonScope();
    bind(protocol_1.HelloBackendService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_2.WebSocketConnectionProvider);
        return connection.createProxy(protocol_1.HELLO_BACKEND_PATH);
    }).inSingletonScope();
    bind(protocol_1.HelloBackendWithClientService).toDynamicValue(ctx => {
        const connection = ctx.container.get(browser_2.WebSocketConnectionProvider);
        const backendClient = ctx.container.get(protocol_1.BackendClient);
        return connection.createProxy(protocol_1.HELLO_BACKEND_WITH_CLIENT_PATH, backendClient);
    }).inSingletonScope();
});
//# sourceMappingURL=extension-frontend-module.js.map