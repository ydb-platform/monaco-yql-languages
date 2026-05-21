import {YQLAutocomplete} from '../yqlAutocomplete';

jest.mock('../../../fillers/monaco-editor-core', () => ({
    languages: {
        CompletionItemKind: {
            Property: 1,
        },
    },
}));

function extractCursor(inputWithCursor: string) {
    const offset = inputWithCursor.indexOf('|');

    if (offset === -1) {
        throw new Error('Input must contain cursor marker');
    }

    return {
        input: inputWithCursor.replace('|', ''),
        offset,
    };
}

function createEmptyRange(column: number) {
    return {
        startLineNumber: 1,
        startColumn: column,
        endLineNumber: 1,
        endColumn: column,
    };
}

describe('YQLAutocomplete settings suggestions range', () => {
    it('should return encoding suggestions with empty range inside autoclosed parentheses', async () => {
        const parseQuery = jest.fn(async () => ({suggestEncodingSettings: true}));
        const getEncodingSettings = jest.fn(async () => ['AUTO', 'DICT', 'PLAIN']);
        const autocomplete = new YQLAutocomplete({
            getQueryParser: async () => parseQuery as any,
            getEncodingSettings,
        });
        const {input, offset} = extractCursor(
            'ALTER TABLE test_table ALTER COLUMN id SET ENCODING(|)',
        );

        const suggestions = await autocomplete.getSuggestions(input, offset);
        const expectedRange = createEmptyRange(offset + 1);

        expect(getEncodingSettings).toHaveBeenCalledWith('');
        expect(suggestions).toEqual([
            expect.objectContaining({label: 'AUTO', range: expectedRange}),
            expect.objectContaining({label: 'DICT', range: expectedRange}),
            expect.objectContaining({label: 'PLAIN', range: expectedRange}),
        ]);
    });

    it('should return encoding suggestions after whitespace inside autoclosed parentheses', async () => {
        const parseQuery = jest.fn(async () => ({suggestEncodingSettings: true}));
        const getEncodingSettings = jest.fn(async () => ['AUTO', 'DICT', 'PLAIN']);
        const autocomplete = new YQLAutocomplete({
            getQueryParser: async () => parseQuery as any,
            getEncodingSettings,
        });
        const {input, offset} = extractCursor(
            'ALTER TABLE test_table ALTER COLUMN id SET ENCODING( |)',
        );

        const suggestions = await autocomplete.getSuggestions(input, offset);
        const expectedRange = createEmptyRange(offset + 1);

        expect(getEncodingSettings).toHaveBeenCalledWith('');
        expect(suggestions).toEqual([
            expect.objectContaining({label: 'AUTO', range: expectedRange}),
            expect.objectContaining({label: 'DICT', range: expectedRange}),
            expect.objectContaining({label: 'PLAIN', range: expectedRange}),
        ]);
    });

    it('should return compression suggestions with empty range inside autoclosed parentheses', async () => {
        const parseQuery = jest.fn(async () => ({suggestCompressionSettings: true}));
        const getCompressionSettings = jest.fn(async () => ['AUTO', 'LZ4', 'ZSTD']);
        const autocomplete = new YQLAutocomplete({
            getQueryParser: async () => parseQuery as any,
            getCompressionSettings,
        });
        const {input, offset} = extractCursor(
            'ALTER TABLE test_table ALTER COLUMN id SET COMPRESSION(|)',
        );

        const suggestions = await autocomplete.getSuggestions(input, offset);
        const expectedRange = createEmptyRange(offset + 1);

        expect(getCompressionSettings).toHaveBeenCalledWith('');
        expect(suggestions).toEqual([
            expect.objectContaining({label: 'AUTO', range: expectedRange}),
            expect.objectContaining({label: 'LZ4', range: expectedRange}),
            expect.objectContaining({label: 'ZSTD', range: expectedRange}),
        ]);
    });
});
