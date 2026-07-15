import yqlAnsiTextMate from '../YQL.ansi.tmLanguage.json';
import yqlMonarch from '../YQL.monarch.json';
import yqlTextMate from '../YQL.tmLanguage.json';
import yqlAnsiMonarch from '../YQLansi.monarch.json';

type MonarchGrammar = {
    ignoreCase?: boolean;
    tokenizer: {
        root: unknown[];
    };
};

type TextMatePattern = {
    include?: string;
    match?: string;
    name?: string;
};

type TextMateGrammar = {
    patterns: TextMatePattern[];
    repository: Record<string, {patterns?: TextMatePattern[]}>;
};

const functionCalls = ['MIN(', 'MIN (', 'MIN\t('];
const keywordCalls = [
    'CAST(',
    'CAST (',
    'CAST\t(',
    'IN(',
    'IN (',
    'EXISTS(',
    'EXISTS (',
    'SELECT(',
    'SELECT (',
];
const monarchControls = [
    ['value', 'identifier'],
    ['CAST', 'keyword'],
    ['SELECT', 'keyword'],
];
const textMateControls = [
    ['value', 'variable.other'],
    ['CAST', 'keyword.control'],
    ['SELECT', 'keyword.control'],
];

function getFirstMatchingToken(grammar: MonarchGrammar, input: string) {
    const flags = grammar.ignoreCase ? 'i' : '';

    for (const rule of grammar.tokenizer.root) {
        if (!Array.isArray(rule)) {
            continue;
        }

        const source: unknown = rule[0];
        const token: unknown = rule[1];

        if (
            typeof source === 'string' &&
            typeof token === 'string' &&
            new RegExp(`^(?:${source})`, flags).test(input)
        ) {
            return token;
        }
    }

    return undefined;
}

function getGenericFunctionPatterns(grammar: TextMateGrammar) {
    return Object.values(grammar.repository)
        .flatMap(({patterns = []}) => patterns)
        .filter(
            ({match, name}) =>
                typeof match === 'string' &&
                name === 'entity.name.function' &&
                match.includes('(?='),
        )
        .map(({match}) => match as string);
}

function createTextMateRegExp(source: string) {
    const ignoreCasePrefix = '(?i)';
    const ignoreCase = source.startsWith(ignoreCasePrefix);
    const normalizedSource = ignoreCase ? source.slice(ignoreCasePrefix.length) : source;

    return new RegExp(`^(?:${normalizedSource})`, ignoreCase ? 'i' : '');
}

function getFirstMatchingTextMateScope(grammar: TextMateGrammar, input: string) {
    for (const topLevelPattern of grammar.patterns) {
        const include = topLevelPattern.include;
        const patterns =
            include?.startsWith('#') === true
                ? (grammar.repository[include.slice(1)]?.patterns ?? [])
                : [topLevelPattern];

        for (const pattern of patterns) {
            if (
                typeof pattern.match === 'string' &&
                typeof pattern.name === 'string' &&
                createTextMateRegExp(pattern.match).test(input)
            ) {
                return pattern.name;
            }
        }
    }

    return undefined;
}

const monarchGrammars: Array<[string, MonarchGrammar]> = [
    ['default', yqlMonarch],
    ['ANSI', yqlAnsiMonarch],
];

const textMateGrammars: Array<[string, TextMateGrammar]> = [
    ['default', yqlTextMate as TextMateGrammar],
    ['ANSI', yqlAnsiTextMate as TextMateGrammar],
];

describe.each(monarchGrammars)('%s YQL Monarch grammar', (_name, grammar) => {
    it.each(functionCalls)('classifies %p as a function', (input) => {
        expect(getFirstMatchingToken(grammar, input)).toBe('support.function');
    });

    it.each(keywordCalls)('classifies %p as a keyword', (input) => {
        expect(getFirstMatchingToken(grammar, input)).toBe('keyword');
    });

    it.each(monarchControls)('classifies %p as %s', (input, expectedToken) => {
        expect(getFirstMatchingToken(grammar, input)).toBe(expectedToken);
    });
});

describe.each(textMateGrammars)('%s YQL TextMate grammar', (_name, grammar) => {
    it('contains one generic function pattern', () => {
        expect(getGenericFunctionPatterns(grammar)).toHaveLength(1);
    });

    it.each(functionCalls)('classifies %p as a function', (input) => {
        expect(getFirstMatchingTextMateScope(grammar, input)).toBe('entity.name.function');
    });

    it.each(keywordCalls)('classifies %p as a keyword', (input) => {
        expect(getFirstMatchingTextMateScope(grammar, input)).toBe('keyword.control');
    });

    it.each(textMateControls)('classifies %p as %s', (input, expectedScope) => {
        expect(getFirstMatchingTextMateScope(grammar, input)).toBe(expectedScope);
    });
});
