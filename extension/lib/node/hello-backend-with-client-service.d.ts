import { BackendClient, HelloBackendWithClientService } from "../common/protocol";
export declare class HelloBackendWithClientServiceImpl implements HelloBackendWithClientService {
    private client?;
    greet(): Promise<string>;
    dispose(): void;
    setClient(client: BackendClient): void;
}
//# sourceMappingURL=hello-backend-with-client-service.d.ts.map