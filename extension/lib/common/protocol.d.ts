import { JsonRpcServer } from '@theia/core/lib/common/messaging';
export declare const HelloBackendService: unique symbol;
export declare const HELLO_BACKEND_PATH = "/services/helloBackend";
export interface HelloBackendService {
    getMethods(getUrl: string, fileName: string): Promise<string[]>;
    sayHelloTo(url: string): Promise<string[]>;
}
export declare const HelloBackendWithClientService: unique symbol;
export declare const HELLO_BACKEND_WITH_CLIENT_PATH = "/services/withClient";
export interface HelloBackendWithClientService extends JsonRpcServer<BackendClient> {
    greet(): Promise<string>;
}
export declare const BackendClient: unique symbol;
export interface BackendClient {
    getName(): Promise<string>;
}
//# sourceMappingURL=protocol.d.ts.map