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
    updateInput(e: React.ChangeEvent<HTMLInputElement>): void;
    insertCells(table: HTMLTableElement, key: string): HTMLTableRowElement;
    buttonClick(table: HTMLTableElement, key: string, values: string, classes: string): void;
    buttonClick2(rows: number): void;
    updateLabel(value: string, count: number): string;
    countKeys(values: string, keyString: string): number;
    showSuggestions(value: string, id: string): void;
    autocompleteMatch(input: any): string[];
    updateJsonObject(): void;
}
//# sourceMappingURL=extension-widget.d.ts.map