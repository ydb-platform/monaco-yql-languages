import type {FetchedColumn} from '../types';
import {generateColumnsSuggestion, generateEntitiesSuggestion} from '../generateSuggestions';
import * as monaco from '../../../fillers/monaco-editor-core';

jest.mock('../../../fillers/monaco-editor-core', () => ({
    languages: {
        CompletionItemKind: {
            Variable: 1,
        },
        CompletionItemInsertTextRule: {
            None: 0,
            InsertAsSnippet: 1,
        },
    },
    IRange: {
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
    },
}));
jest.mock('../utils', () => ({
    suggestionIndexToWeight: (_index: number) => '0',
    removeStringDuplicates: (value: string[]) => value ?? [],
    isVariable: (_value: string) => false,
    removeBackticks: (value: string) => value,
    wrapStringToBackticks: (value: string) => value,
    getSuggestionIndex: (_value: string) => 0,
}));

const mockRange: monaco.IRange = {
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 1,
};

describe('generateColumnsSuggestion', () => {
    it('should return an empty array if suggestColumns is undefined', async () => {
        expect(await generateColumnsSuggestion(mockRange, undefined, [], [])).toEqual([]);
        expect(await generateColumnsSuggestion(mockRange, {tables: []}, [], [])).toEqual([]);
    });

    it('should generate suggestions for a single table with columns', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [{name: 'table1', columns: ['col1', 'col2']}],
            },
            [],
            [],
        );
        expect(result).toEqual([
            {
                label: {label: 'col1', description: undefined},
                insertText: 'col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
            {
                label: {label: 'col2', description: undefined},
                insertText: 'col2',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
        ]);
    });

    it('should generate suggestions for multiple tables with columns', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [
                    {name: 'table1', columns: ['col1']},
                    {name: 'table2', columns: ['col2']},
                ],
            },
            [],
            [],
        );
        expect(result).toEqual([
            {
                label: {label: 'table1.col1', description: undefined},
                insertText: 'table1.col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
            {
                label: {label: 'table2.col2', description: undefined},
                insertText: 'table2.col2',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
        ]);
    });

    it('should generate suggestions for tables with aliases', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [{name: 'table1', columns: ['col1'], alias: 't1'}],
            },
            [],
            [],
        );
        expect(result).toEqual([
            {
                label: {label: 't1.col1', description: undefined},
                insertText: 't1.col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
        ]);
    });

    it('should handle variables as table sources', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [{name: '$var1', columns: ['col1']}],
                all: false,
            },
            [{name: 'var1', value: {columns: ['col1']}}],
            [],
        );
        expect(result).toEqual([
            {
                label: {label: 'col1', description: undefined},
                insertText: 'col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
        ]);
    });

    it('should generate all columns suggestion when multiple tables are present', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [
                    {name: 'table1', columns: ['col1']},
                    {name: 'table2', columns: ['col2']},
                ],
                all: true,
            },
            [],
            [],
        );
        expect(result).toEqual([
            {
                label: {label: 'table1.col1', description: undefined},
                insertText: 'table1.col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
            {
                label: {label: 'table2.col2', description: undefined},
                insertText: 'table2.col2',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
            {
                label: 'table1.col1, table2.col2',
                insertText: 'table1.col1, table2.col2',
                kind: 1,
                range: mockRange,
                sortText: '0',
            },
        ]);
    });

    it('should handle fetched columns', async () => {
        const fetchedColumns: FetchedColumn[] = [
            {name: 'col3', parent: 'table1', detail: 'detail3'},
        ];
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [{name: 'table1', columns: ['col1']}],
            },
            [],
            fetchedColumns,
        );
        expect(result).toEqual([
            {
                label: {label: 'col3', description: 'detail3'},
                insertText: 'col3',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
            {
                label: {label: 'col1', description: undefined},
                insertText: 'col1',
                kind: 1,
                detail: 'Column',
                range: mockRange,
                sortText: '00',
            },
        ]);
    });

    it('should handle empty tables', async () => {
        const result = await generateColumnsSuggestion(
            mockRange,
            {
                tables: [{name: 'table1', columns: []}],
            },
            [],
            [],
        );
        expect(result).toEqual([]);
    });
});

describe('generateEntitiesSuggestion', () => {
    it('should return an empty array if there are no entities', async () => {
        const result = await generateEntitiesSuggestion(mockRange, []);
        expect(result).toEqual([]);
    });

    it('should generate suggestions for multiple entities', async () => {
        const entities = [
            {value: 'entity1', isDir: false},
            {value: 'entity2', isDir: true},
        ];
        const suggestions = await generateEntitiesSuggestion(mockRange, entities, 'ent');
        expect(suggestions).toEqual([
            {
                label: 'entity1',
                insertText: 'entity1',
                kind: undefined,
                insertTextRules: 0,
                detail: undefined,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: undefined,
                sortText: '00',
            },
            {
                label: 'entity2/',
                insertText: '`entity2/$0`',
                kind: undefined,
                insertTextRules: 1,
                detail: undefined,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: {id: 'editor.action.triggerSuggest', title: ''},
                sortText: '00',
            },
        ]);
    });
    it('should generate suggestions with prefix with backtick', async () => {
        const entities = [
            {value: 'entity1', isDir: false},
            {value: 'entity2', isDir: true},
        ];
        const suggestions = await generateEntitiesSuggestion(mockRange, entities, '`ent');
        expect(suggestions).toEqual([
            {
                label: 'entity1',
                insertText: 'entity1',
                kind: undefined,
                insertTextRules: 0,
                detail: undefined,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: undefined,
                sortText: '00',
            },
            {
                label: 'entity2/',
                insertText: 'entity2/',
                kind: undefined,
                insertTextRules: 0,
                detail: undefined,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: {id: 'editor.action.triggerSuggest', title: ''},
                sortText: '00',
            },
        ]);
    });

    it('should handle entities with descriptions', async () => {
        const entities = [
            {value: 'entity1', detail: 'description1', isDir: true},
            {value: 'entity2', isDir: false},
        ];
        const suggestions = await generateEntitiesSuggestion(mockRange, entities);
        expect(suggestions).toEqual([
            {
                label: 'entity1/',
                insertText: '`entity1/$0`',
                kind: undefined,
                insertTextRules: 1,
                detail: 'description1',
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: {id: 'editor.action.triggerSuggest', title: ''},
                sortText: '00',
            },
            {
                label: 'entity2',
                insertText: 'entity2',
                kind: undefined,
                insertTextRules: 0,
                detail: undefined,
                range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1,
                },
                command: undefined,
                sortText: '00',
            },
        ]);
    });
});
