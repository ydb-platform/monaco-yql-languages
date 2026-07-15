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

type TextMateRule = {
    match: string;
    name: string;
};

const functionCalls = ['CAST(', 'CAST (', 'CAST\t(', 'MIN(', 'MIN ('];
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

function collectTextMateRules(value: unknown, rules: TextMateRule[] = []) {
    if (Array.isArray(value)) {
        value.forEach((item) => collectTextMateRules(item, rules));
        return rules;
    }

    if (!value || typeof value !== 'object') {
        return rules;
    }

    const record = value as Record<string, unknown>;

    if (typeof record.match === 'string' && typeof record.name === 'string') {
        rules.push({match: record.match, name: record.name});
    }

    Object.values(record).forEach((item) => collectTextMateRules(item, rules));

    return rules;
}

function getGenericFunctionPatterns(grammar: unknown) {
    return collectTextMateRules(grammar)
        .filter(({name}) => name === 'entity.name.function')
        .map(({match}) => match)
        .filter((match) => match.includes('(?='));
}

function createTextMateRegExp(source: string, anchorEnd = false) {
    const ignoreCasePrefix = '(?i)';
    const ignoreCase = source.startsWith(ignoreCasePrefix);
    const normalizedSource = ignoreCase ? source.slice(ignoreCasePrefix.length) : source;
    const endAnchor = anchorEnd ? '$' : '';

    return new RegExp(`^(?:${normalizedSource})${endAnchor}`, ignoreCase ? 'i' : '');
}

function matchesTextMateRule(grammar: unknown, name: string, input: string) {
    return collectTextMateRules(grammar)
        .filter((rule) => rule.name === name)
        .some((rule) => createTextMateRegExp(rule.match, true).test(input));
}

const monarchGrammars: Array<[string, MonarchGrammar]> = [
    ['default', yqlMonarch],
    ['ANSI', yqlAnsiMonarch],
];

const textMateGrammars: Array<[string, unknown]> = [
    ['default', yqlTextMate],
    ['ANSI', yqlAnsiTextMate],
];

describe.each(monarchGrammars)('%s YQL Monarch grammar', (_name, grammar) => {
    it.each(functionCalls)('classifies %p as a function', (input) => {
        expect(getFirstMatchingToken(grammar, input)).toBe('support.function');
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
        const [functionPattern] = getGenericFunctionPatterns(grammar);

        expect(createTextMateRegExp(functionPattern).test(input)).toBe(true);
    });

    it.each(textMateControls)('classifies %p as %s', (input, expectedScope) => {
        expect(matchesTextMateRule(grammar, 'entity.name.function', input)).toBe(false);
        expect(matchesTextMateRule(grammar, expectedScope, input)).toBe(true);
    });
});
