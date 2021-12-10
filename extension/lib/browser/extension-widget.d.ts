import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { HelloBackendService } from '../common/protocol';
export declare class extensionWidget extends ReactWidget {
    [x: string]: any;
    static readonly ID = "extension:widget";
    static readonly LABEL = "Extension Widget";
    static state: {
        statePatternSelection: string;
    };
    protected readonly messageService: MessageService;
    protected readonly helloBackendService: HelloBackendService;
    protected init(): Promise<void>;
    static setState: any;
    static res: string[];
    static methodNames: string[];
    static textBoxValues: Array<string>;
    static data: any;
    static explanation: any;
    protected render(): React.ReactNode;
    protected runprocess(): Promise<void>;
    updateSelection(e: React.ChangeEvent<HTMLSelectElement>): void;
    insertCells(table: HTMLTableElement, key: string): void;
    extensionButtonClick(table: HTMLTableElement, key: string, values: string): void;
    buttonClick2(rows: number): Promise<void>;
    updateLabel(value: string, count: number): string;
    countKeys(values: string, keyString: string): number;
    showSuggestions(value: string, table: string[], id: string): void;
    autocompleteMatch(input: string, table: string[]): string[];
    updateJsonObject(): void;
    checkInputs(): "Inputs are invalid" | "Inputs are valid";
    checkInputsForSameValues(): boolean;
    refreshPage(table: HTMLTableElement): void;
    insertInputsAbstractFactory(): void;
    insertInputsFactoryMethod(): void;
    insertInputsBuilder(): void;
    checkEmptyInputs(rows: number): boolean;
    check(key: string): boolean;
}
//# sourceMappingURL=extension-widget.d.ts.map