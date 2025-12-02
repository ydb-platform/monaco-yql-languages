import type {CursorPosition as BaseCursorPosition} from '@gravity-ui/websql-autocomplete/shared';
import type {YQLEntity} from '@gravity-ui/websql-autocomplete/yql';
import type Monaco from 'monaco-editor';

import {
    generateAggregateFunctionsSuggestion,
    generateColumnAliasesSuggestion,
    generateColumnsSuggestion,
    generateEntitiesSuggestion,
    generateEntitySettingsSuggestion,
    generateKeywordsSuggestion,
    generatePragmasSuggestion,
    generateSimpleFunctionsSuggestion,
    generateSimpleTypesSuggestion,
    generateTableFunctionsSuggestion,
    generateUdfSuggestion,
    generateVariableSuggestion,
    generateWindowFunctionsSuggestion,
} from './generateSuggestions';
import type {CursorPosition, FetchedColumn, FetchedEntity} from './types';
import {getEntitiesToFetchColumns} from './utils';

function getCursorPosition(input: string, offset: number): CursorPosition {
    const lines = input.slice(0, offset).split('\n');
    // parser suggest to get cursor position where lineNumber and column starts from 1
    return {
        lineNumber: lines.length,
        column: lines[lines.length - 1].length + 1,
    };
}

const prefixRegexp = /([^\s]+)$/;

function getCursorPrefix(input: string, offset: number, re = prefixRegexp) {
    const prevText = input.slice(0, offset);

    const match = prevText.match(re);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}

const prefixToReplaceRegexp = /([^\\/\s`]+)$/;

function getRangeToInsertSuggestion(input: string, offset: number) {
    const cursorPosition = getCursorPosition(input, offset);
    const cursorPrefix = getCursorPrefix(input, offset, prefixToReplaceRegexp);
    return {
        startColumn: cursorPosition.column - cursorPrefix.length,
        startLineNumber: cursorPosition.lineNumber,
        endColumn: cursorPosition.column,
        endLineNumber: cursorPosition.lineNumber,
    };
}

export type YQLAutocompleteConfig = {
    getQueryParser?: YQLAutocomplete['getQueryParser'];
    getUdfs?: YQLAutocomplete['getUdfs'];
    getSimpleTypes?: YQLAutocomplete['getSimpleTypes'];
    getPragmas?: YQLAutocomplete['getPragmas'];
    getWindowFunctions?: YQLAutocomplete['getWindowFunctions'];
    getTableFunctions?: YQLAutocomplete['getTableFunctions'];
    getAggregateFunctions?: YQLAutocomplete['getAggregateFunctions'];
    getSimpleFunctions?: YQLAutocomplete['getSimpleFunctions'];
    getEntitySettings?: YQLAutocomplete['getEntitySettings'];
    fetchEntities?: YQLAutocomplete['fetchEntities'];
    fetchEntityColumns?: YQLAutocomplete['fetchEntityColumns'];
};

export class YQLAutocomplete {
    constructor({
        getQueryParser,
        getUdfs,
        getSimpleTypes,
        getPragmas,
        getWindowFunctions,
        getTableFunctions,
        getAggregateFunctions,
        getSimpleFunctions,
        getEntitySettings,
        fetchEntities,
        fetchEntityColumns,
    }: YQLAutocompleteConfig) {
        if (getQueryParser) {
            this.getQueryParser = getQueryParser;
        }
        if (getUdfs) {
            this.getUdfs = getUdfs;
        }
        if (getSimpleTypes) {
            this.getSimpleTypes = getSimpleTypes;
        }
        if (getPragmas) {
            this.getPragmas = getPragmas;
        }
        if (getWindowFunctions) {
            this.getWindowFunctions = getWindowFunctions;
        }
        if (getTableFunctions) {
            this.getTableFunctions = getTableFunctions;
        }
        if (getAggregateFunctions) {
            this.getAggregateFunctions = getAggregateFunctions;
        }
        if (getSimpleFunctions) {
            this.getSimpleFunctions = getSimpleFunctions;
        }
        if (getEntitySettings) {
            this.getEntitySettings = getEntitySettings;
        }
        if (fetchEntities) {
            this.fetchEntities = fetchEntities;
        }
        if (fetchEntityColumns) {
            this.fetchEntityColumns = fetchEntityColumns;
        }
    }

    async getSuggestions(input: string, offset: number) {
        const parseResult = await this.parseInput(input, offset);
        let entitiesSuggestions: Monaco.languages.CompletionItem[] = [];
        let functionsSuggestions: Monaco.languages.CompletionItem[] = [];
        let aggregateFunctionsSuggestions: Monaco.languages.CompletionItem[] = [];
        let windowFunctionsSuggestions: Monaco.languages.CompletionItem[] = [];
        let tableFunctionsSuggestions: Monaco.languages.CompletionItem[] = [];
        let udfsSuggestions: Monaco.languages.CompletionItem[] = [];
        let simpleTypesSuggestions: Monaco.languages.CompletionItem[] = [];
        let pragmasSuggestions: Monaco.languages.CompletionItem[] = [];
        let entitySettingsSuggestions: Monaco.languages.CompletionItem[] = [];
        let variableSuggestions: Monaco.languages.CompletionItem[] = [];
        let columnsSuggestions: Monaco.languages.CompletionItem[] = [];

        const rangeToInsertSuggestion = getRangeToInsertSuggestion(input, offset);

        const cursorPrefix = getCursorPrefix(input, offset);

        if (parseResult.suggestSimpleTypes) {
            const simpleTypes = await this.getSimpleTypes(cursorPrefix);
            simpleTypesSuggestions = await generateSimpleTypesSuggestion(
                rangeToInsertSuggestion,
                simpleTypes,
            );
        }
        if (parseResult.suggestEntity) {
            const fetchedEntities = await this.fetchEntities(
                cursorPrefix,
                parseResult.suggestEntity,
            );
            entitiesSuggestions = await generateEntitiesSuggestion(
                rangeToInsertSuggestion,
                fetchedEntities,
                cursorPrefix,
            );
        }
        if (parseResult.suggestVariables) {
            variableSuggestions = generateVariableSuggestion(
                rangeToInsertSuggestion,
                parseResult.suggestVariables,
            );
        }

        if (parseResult.suggestFunctions) {
            const simpleFunctions = await this.getSimpleFunctions(cursorPrefix);
            functionsSuggestions = await generateSimpleFunctionsSuggestion(
                rangeToInsertSuggestion,
                simpleFunctions,
            );
        }
        if (parseResult.suggestAggregateFunctions) {
            const aggregateFunctions = await this.getAggregateFunctions(cursorPrefix);
            aggregateFunctionsSuggestions = await generateAggregateFunctionsSuggestion(
                rangeToInsertSuggestion,
                aggregateFunctions,
            );
        }
        if (parseResult.suggestWindowFunctions) {
            const windowFunctions = await this.getWindowFunctions(cursorPrefix);
            windowFunctionsSuggestions = await generateWindowFunctionsSuggestion(
                rangeToInsertSuggestion,
                windowFunctions,
            );
        }
        if (parseResult.suggestTableFunctions) {
            const tableFunctions = await this.getTableFunctions(cursorPrefix);
            tableFunctionsSuggestions = await generateTableFunctionsSuggestion(
                rangeToInsertSuggestion,
                tableFunctions,
            );
        }

        if (parseResult.suggestUdfs) {
            const udfs = await this.getUdfs(cursorPrefix);
            udfsSuggestions = await generateUdfSuggestion(rangeToInsertSuggestion, udfs);
        }
        if (parseResult.suggestPragmas) {
            const pragmas = await this.getPragmas(cursorPrefix);
            pragmasSuggestions = await generatePragmasSuggestion(rangeToInsertSuggestion, pragmas);
        }
        if (parseResult.suggestEntitySettings) {
            const entitySettings = await this.getEntitySettings(parseResult.suggestEntitySettings);
            entitySettingsSuggestions = await generateEntitySettingsSuggestion(
                rangeToInsertSuggestion,
                entitySettings,
            );
        }

        const keywordsSuggestions = generateKeywordsSuggestion(
            rangeToInsertSuggestion,
            parseResult.suggestKeywords,
        );

        const columnAliasSuggestion = await generateColumnAliasesSuggestion(
            rangeToInsertSuggestion,
            parseResult.suggestColumnAliases,
        );

        if (parseResult.suggestColumns) {
            const entities = getEntitiesToFetchColumns(parseResult.suggestColumns);
            const fetchedColumns = await this.fetchEntityColumns(entities);

            columnsSuggestions = await generateColumnsSuggestion(
                rangeToInsertSuggestion,
                parseResult.suggestColumns,
                parseResult.suggestVariables,
                fetchedColumns,
            );
        }

        const suggestions: Monaco.languages.CompletionItem[] = [
            ...entitiesSuggestions,
            ...functionsSuggestions,
            ...windowFunctionsSuggestions,
            ...tableFunctionsSuggestions,
            ...udfsSuggestions,
            ...simpleTypesSuggestions,
            ...pragmasSuggestions,
            ...columnAliasSuggestion,
            ...columnsSuggestions,
            ...keywordsSuggestions,
            ...aggregateFunctionsSuggestions,
            ...entitySettingsSuggestions,
            ...variableSuggestions,
        ];

        return suggestions;
    }

    async parseInput(input: string, offset: number) {
        const cursorPosition = getCursorPosition(input, offset);

        const parseQuery = await this.getQueryParser();
        const cursorForParsing: BaseCursorPosition = {
            line: cursorPosition.lineNumber,
            column: cursorPosition.column,
        };
        return parseQuery(input, cursorForParsing);
    }

    async getQueryParser() {
        const {parseYqlQuery: parseQuery} = await import('@gravity-ui/websql-autocomplete/yql');
        return parseQuery;
    }

    async getSimpleTypes(_prefix?: string): Promise<string[]> {
        return [];
    }

    async getUdfs(_prefix?: string): Promise<string[]> {
        return [];
    }

    async getPragmas(_prefix?: string): Promise<string[]> {
        return [];
    }
    async getWindowFunctions(_prefix?: string): Promise<string[]> {
        return [];
    }

    async getTableFunctions(_prefix?: string): Promise<string[]> {
        return [];
    }
    async getAggregateFunctions(_prefix?: string): Promise<string[]> {
        return [];
    }

    async getSimpleFunctions(_prefix?: string): Promise<string[]> {
        return [];
    }

    /**
     * Fetches entity settings based on provided entity type.
     * @param entityType
     * @returns  A promise that resolves to an array of entity settings.
     */
    async getEntitySettings(_entityType: YQLEntity): Promise<string[]> {
        return [];
    }
    /**
     * Fetches entities based on the provided prefix and needed entity types.
     * @param prefix - The prefix to filter entities.
     * @param neededEntityTypes - An array of entity types to fetch.
     * @returns A promise that resolves to an array of fetched entities.
     */
    async fetchEntities(
        _prefix: string,
        _neededEntityTypes: YQLEntity[],
    ): Promise<FetchedEntity[]> {
        return [];
    }
    /**
     * Fetches columns for the specified entities.
     * @param entityNames - An array of entity names to fetch columns for.
     * @returns A promise that resolves to an array of fetched columns.
     */
    async fetchEntityColumns(_entityNames: string[]): Promise<FetchedColumn[]> {
        return [];
    }
}

export function getSuggestionsGetter(config: YQLAutocompleteConfig = {}) {
    const autocompleteInstance = new YQLAutocomplete(config);
    return async (
        model: Monaco.editor.ITextModel,
        monacoCursorPosition: Monaco.Position,
        _context: Monaco.languages.CompletionContext,
        _token: Monaco.CancellationToken,
    ) => {
        const suggestions = await autocompleteInstance.getSuggestions(
            model.getValue(),
            model.getOffsetAt(monacoCursorPosition),
        );

        return {suggestions};
    };
}
