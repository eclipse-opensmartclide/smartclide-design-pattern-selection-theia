import { HelloBackendService } from "../common/protocol";
import { FileSearchService } from "@theia/file-search/lib/common/file-search-service";
interface LabeledValue {
    label: string[];
}
export declare class HelloBackendServiceImpl implements HelloBackendService {
    protected readonly fileSearchService: FileSearchService;
    static index: number;
    static array: string[];
    sayHelloTo(url: string): Promise<string[]>;
    getMethods(url: string, fileName: string): Promise<string[]>;
<<<<<<< HEAD
    fillPromise(labelObj: LabeledValue, item: string): void;
=======
    main(): Promise<void>;
>>>>>>> a0b0ab1c13cf2401caba4a8c3d3a1cbfd3da820b
}
export {};
//# sourceMappingURL=hello-backend-service.d.ts.map