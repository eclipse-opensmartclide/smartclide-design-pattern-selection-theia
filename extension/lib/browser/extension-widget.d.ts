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
    static textBoxValues: Array<string>;
    static res: string[];
    static data: any;
    protected render(): React.ReactNode;
    protected runprocess(): Promise<void>;
    updateSelection(e: React.ChangeEvent<HTMLSelectElement>): void;
    insertCells(table: HTMLTableElement, key: string): HTMLTableRowElement;
    extensionButtonClick(table: HTMLTableElement, key: string, values: string): void;
    buttonClick2(rows: number): Promise<void>;
    updateLabel(value: string, count: number): string;
    countKeys(values: string, keyString: string): number;
    showSuggestions(value: string, id: string): void;
    autocompleteMatch(input: string): string[];
    updateJsonObject(): void;
    checkInputs(): Promise<"Inputs are invalid" | "Inputs are valid">;
    checkInputsForSameValues(): boolean;
}
//# sourceMappingURL=extension-widget.d.ts.map