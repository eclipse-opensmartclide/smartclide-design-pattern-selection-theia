import { HelloBackendService } from "../common/protocol";
interface LabeledValue {
    label: string[];
}
export declare class HelloBackendServiceImpl implements HelloBackendService {
    Path: any;
    FS: any;
    static Files: string[];
    static index: number;
    static array: string[];
    ThroughDirectory(Directory: string): void;
    sayHelloTo(url: string): Promise<string[]>;
    getMethods(url: string, fileName: string): Promise<string[]>;
    fillPromise(labelObj: LabeledValue, item: string): void;
    codeGeneration(url: string, jsonObj: string, statePatternSelection: string): Promise<string>;
}
export {};
//# sourceMappingURL=hello-backend-service.d.ts.map