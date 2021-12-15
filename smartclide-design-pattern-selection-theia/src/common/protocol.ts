import { JsonRpcServer } from '@theia/core/lib/common/messaging';

export const HelloBackendService = Symbol('HelloBackendService');
export const HELLO_BACKEND_PATH = '/services/helloBackend';

export interface HelloBackendService {
	getMethods(getUrl: string, fileName:string): Promise<string[]>;
    sayHelloTo(url: string): Promise<string[]>;
    codeGeneration(cName : string, jsonObj: string, statePatternSelection: string): Promise<string>;
    
}
export const HelloBackendWithClientService = Symbol('BackendWithClient');
export const HELLO_BACKEND_WITH_CLIENT_PATH = '/services/withClient';

export interface HelloBackendWithClientService extends JsonRpcServer<BackendClient> {
    greet(): Promise<string>
}
export const BackendClient = Symbol('BackendClient');
export interface BackendClient {
    getName(): Promise<string>;
}
