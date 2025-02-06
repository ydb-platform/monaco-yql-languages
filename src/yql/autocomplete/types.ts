import type {YQLEntity} from '@gravity-ui/websql-autocomplete/yql';

export type CursorPosition = {lineNumber: number; column: number};

export type AutocompleteEntityType = YQLEntity | 'directory';

export type FetchedEntity = {
    value: string;
    isDir: boolean;
    detail?: string;
};

export type FetchedColumn = {name: string; detail?: string; parent: string};
