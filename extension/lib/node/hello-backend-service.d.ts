import { HelloBackendService } from "../common/protocol";
import { FileSearchService } from "@theia/file-search/lib/common/file-search-service";
export declare class HelloBackendServiceImpl implements HelloBackendService {
    protected readonly fileSearchService: FileSearchService;
    static index: number;
    sayHelloTo(url: string): Promise<string[]>;
}
//# sourceMappingURL=hello-backend-service.d.ts.map