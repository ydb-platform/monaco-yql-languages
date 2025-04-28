import type {
    ColumnAliasSuggestion,
    KeywordSuggestion,
    VariableSuggestion,
} from '@gravity-ui/websql-autocomplete/shared';
import type {YqlAutocompleteResult} from '@gravity-ui/websql-autocomplete/yql';
import * as monaco from '../../fillers/monaco-editor-core';

import type {FetchedColumn, FetchedEntity} from './types';
import {
    getSuggestionIndex,
    isVariable,
    removeBackticks,
    removeStringDuplicates,
    wrapStringToBackticks,
} from './utils';
import {suggestionIndexToWeight} from '../../utils';

export async function generateSimpleTypesSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    simpleTypes: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return simpleTypes.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.TypeParameter,
        detail: 'Type',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestSimpleTypes')),
    }));
}

export async function generateEntitiesSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    fetchedEntities: FetchedEntity[],
    prefix = '',
): Promise<monaco.languages.CompletionItem[]> {
    const withBackticks = prefix?.startsWith('`');

    return fetchedEntities.reduce<monaco.languages.CompletionItem[]>(
        (acc, {value, detail, isDir}) => {
            const label = isDir ? `${value}/` : value;
            let labelAsSnippet;
            if (isDir && !withBackticks) {
                labelAsSnippet = `\`${label}$0\``;
            }
            const suggestionIndex = acc.length;
            acc.push({
                label,
                insertText: labelAsSnippet ?? label,
                kind: isDir
                    ? monaco.languages.CompletionItemKind.Folder
                    : monaco.languages.CompletionItemKind.Text,
                insertTextRules: labelAsSnippet
                    ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                    : monaco.languages.CompletionItemInsertTextRule.None,
                detail: detail,
                range: rangeToInsertSuggestion,
                command: label.endsWith('/')
                    ? {id: 'editor.action.triggerSuggest', title: ''}
                    : undefined,
                // first argument is responsible for sorting groups of suggestions, the second - to preserve suggestions order returned from backend
                sortText:
                    suggestionIndexToWeight(getSuggestionIndex('suggestEntity')) +
                    suggestionIndexToWeight(suggestionIndex),
            });
            return acc;
        },
        [],
    );
}

export function generateKeywordsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    suggestKeywords: KeywordSuggestion[] = [],
) {
    return suggestKeywords.map((keywordSuggestion) => ({
        label: keywordSuggestion.value,
        insertText: keywordSuggestion.value,
        kind: monaco.languages.CompletionItemKind.Keyword,
        detail: 'Keyword',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestKeywords')),
    }));
}

export function generateVariableSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    suggestVariables: VariableSuggestion[] = [],
) {
    return suggestVariables.map(({name}) => {
        const variable = '$' + name;
        return {
            label: variable,
            insertText: variable,
            kind: monaco.languages.CompletionItemKind.Variable,
            detail: 'Variable',
            range: rangeToInsertSuggestion,
            sortText: suggestionIndexToWeight(getSuggestionIndex('suggestVariables')),
        };
    });
}

export async function generateSimpleFunctionsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    functions: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return functions.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: 'Function',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestFunctions')),
    }));
}

export async function generateAggregateFunctionsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    aggreagteFunctions: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return aggreagteFunctions.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: 'Aggregate function',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestAggregateFunctions')),
    }));
}

export async function generateWindowFunctionsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    windowFunctions: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return windowFunctions.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: 'Window function',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestWindowFunctions')),
    }));
}

export async function generateTableFunctionsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    tableFunctions: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return tableFunctions.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: 'Table function',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestTableFunctions')),
    }));
}

export async function generateUdfSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    udfs: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return udfs.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Function,
        detail: 'UDF',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestUdfs')),
    }));
}

export async function generatePragmasSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    pragmas: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return pragmas.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Module,
        detail: 'Pragma',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestPragmas')),
    }));
}

export async function generateEntitySettingsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    entitySettings: string[] = [],
): Promise<monaco.languages.CompletionItem[]> {
    return entitySettings.map((el) => ({
        label: el,
        insertText: el,
        kind: monaco.languages.CompletionItemKind.Property,
        detail: 'Setting',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestEntitySettings')),
    }));
}

export function generateColumnAliasesSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    suggestColumnAliases: ColumnAliasSuggestion[] = [],
) {
    return suggestColumnAliases.map((columnAliasSuggestion) => ({
        label: columnAliasSuggestion.name,
        insertText: columnAliasSuggestion.name,
        kind: monaco.languages.CompletionItemKind.Variable,
        detail: 'Column alias',
        range: rangeToInsertSuggestion,
        sortText: suggestionIndexToWeight(getSuggestionIndex('suggestColumnAliases')),
    }));
}

export async function generateColumnsSuggestion(
    rangeToInsertSuggestion: monaco.IRange,
    suggestColumns: YqlAutocompleteResult['suggestColumns'],
    suggestVariables: YqlAutocompleteResult['suggestVariables'],
    fetchedColumns: FetchedColumn[],
): Promise<monaco.languages.CompletionItem[]> {
    if (!suggestColumns?.tables) {
        return [];
    }
    const suggestions: monaco.languages.CompletionItem[] = [];
    const allColumnsSuggestion = suggestColumns.all ? ([] as string[]) : undefined;
    const multi = suggestColumns.tables.length > 1;

    const tableNames = suggestColumns.tables.map((entity) => entity.name);
    const filteredTableNames = removeStringDuplicates(tableNames);

    const variableSources = filteredTableNames.filter(isVariable);

    const columnsFromVariable: FetchedColumn[] = [];
    if (variableSources.length) {
        variableSources.forEach((source) => {
            const newColumns =
                suggestVariables
                    // Variable name from suggestions doesn't include $ sign
                    ?.find((variable) => source.slice(1) === variable.name)
                    ?.value?.columns?.map((col) => ({
                        name: col,
                        parent: source,
                    })) ?? [];
            columnsFromVariable.push(...newColumns);
        });
    }

    const predefinedColumns: FetchedColumn[] = suggestColumns.tables.reduce<FetchedColumn[]>(
        (acc, entity) => {
            const columns = entity.columns;
            if (columns) {
                acc.push(
                    ...columns.map((col) => ({
                        name: col,
                        parent: entity.name,
                    })),
                );
            }
            return acc;
        },
        [],
    );

    const tableNameToAliasMap = suggestColumns.tables?.reduce(
        (acc, entity) => {
            const name = removeBackticks(entity.name);
            const aliases = acc[name] ?? [];
            if (entity.alias) {
                aliases.push(entity.alias);
            }
            acc[name] = aliases;
            return acc;
        },
        {} as Record<string, string[]>,
    );

    [...fetchedColumns, ...columnsFromVariable, ...predefinedColumns].forEach((col) => {
        const normalizedName = wrapStringToBackticks(col.name);

        const aliases = tableNameToAliasMap[removeBackticks(col.parent)];
        const currentSuggestionIndex = suggestions.length;
        if (aliases?.length) {
            aliases.forEach((a) => {
                const columnNameSuggestion = `${a}.${normalizedName}`;
                suggestions.push({
                    label: {label: columnNameSuggestion, description: col.detail},
                    insertText: columnNameSuggestion,
                    kind: monaco.languages.CompletionItemKind.Variable,
                    detail: 'Column',
                    range: rangeToInsertSuggestion,
                    sortText:
                        suggestionIndexToWeight(getSuggestionIndex('suggestColumns')) +
                        suggestionIndexToWeight(currentSuggestionIndex),
                });
                allColumnsSuggestion?.push(columnNameSuggestion);
            });
        } else {
            let columnNameSuggestion = normalizedName;
            if (multi) {
                columnNameSuggestion = `${wrapStringToBackticks(col.parent)}.${normalizedName}`;
            }
            suggestions.push({
                label: {
                    label: columnNameSuggestion,
                    description: col.detail,
                },
                insertText: columnNameSuggestion,
                kind: monaco.languages.CompletionItemKind.Variable,
                detail: 'Column',
                range: rangeToInsertSuggestion,
                sortText:
                    suggestionIndexToWeight(getSuggestionIndex('suggestColumns')) +
                    suggestionIndexToWeight(currentSuggestionIndex),
            });
            allColumnsSuggestion?.push(columnNameSuggestion);
        }
    });
    if (allColumnsSuggestion && allColumnsSuggestion.length > 1) {
        const allColumns = allColumnsSuggestion.join(', ');
        suggestions.push({
            label: allColumns,
            insertText: allColumns,
            kind: monaco.languages.CompletionItemKind.Variable,
            range: rangeToInsertSuggestion,
            sortText: suggestionIndexToWeight(getSuggestionIndex('suggestAllColumns')),
        });
    }
    return suggestions;
}
