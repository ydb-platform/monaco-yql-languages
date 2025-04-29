import type {YqlAutocompleteResult} from '@gravity-ui/websql-autocomplete/yql';

type SuggestionType =
    | keyof Omit<YqlAutocompleteResult, 'errors' | 'suggestDatabases'>
    | 'suggestAllColumns';

const SuggestionsWeight: Record<SuggestionType, number> = {
    suggestTemplates: 0,
    suggestPragmas: 1,
    suggestEntity: 2,
    suggestAllColumns: 3,
    suggestColumns: 4,
    suggestColumnAliases: 5,
    suggestVariables: 6,
    suggestTableIndexes: 7,
    suggestTableHints: 8,
    suggestEntitySettings: 9,
    suggestKeywords: 10,
    suggestAggregateFunctions: 11,
    suggestTableFunctions: 12,
    suggestWindowFunctions: 13,
    suggestFunctions: 14,
    suggestSimpleTypes: 15,
    suggestUdfs: 16,
};

export function getSuggestionIndex(suggestionType: SuggestionType) {
    return SuggestionsWeight[suggestionType];
}

export function isVariable(value: string) {
    return value.startsWith('$');
}

export function removeStringDuplicates(value: string[] = []) {
    return Array.from(new Set(value));
}

export function getEntitiesToFetchColumns(suggestColumns: YqlAutocompleteResult['suggestColumns']) {
    const names = suggestColumns?.tables?.map((entity) => entity.name);
    // remove duplicates if any
    const filteredTableNames = removeStringDuplicates(names);
    return filteredTableNames.filter((name) => !isVariable(name));
}

const specialSymbols = /[\s'"-/@]/;

export function wrapStringToBackticks(value: string) {
    if (value.startsWith('`') && value.endsWith('`')) {
        return value;
    }
    let result = value;
    if (value.match(specialSymbols)) {
        result = `\`${value}\``;
    }
    return result;
}

export function removeBackticks(value: string) {
    let sliceStart = 0;
    let sliceEnd = value.length;
    if (value.startsWith('`')) {
        sliceStart = 1;
    }
    if (value.endsWith('`')) {
        sliceEnd = -1;
    }
    return value.slice(sliceStart, sliceEnd);
}
