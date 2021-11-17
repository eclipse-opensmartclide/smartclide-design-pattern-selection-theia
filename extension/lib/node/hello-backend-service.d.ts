import { HelloBackendService } from "../common/protocol";
import { FileSearchService } from "@theia/file-search/lib/common/file-search-service";
export declare class HelloBackendServiceImpl implements HelloBackendService {
    protected readonly fileSearchService: FileSearchService;
    static index: number;
    static array: string[];
    sayHelloTo(url: string): Promise<string[]>;
    getMethods(url: string, fileName: string): Promise<string[]>;
    main(): Promise<void>;
}
//# sourceMappingURL=hello-backend-service.d.ts.map