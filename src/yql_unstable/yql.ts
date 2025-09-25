import type {languages} from '../fillers/monaco-editor-core';

import {tokenizer} from './YQL.monarch.json';
import {tokenizer as tokenizerAnsi} from './YQLs.monarch.json';

export const conf: languages.LanguageConfiguration = {
    comments: {
        lineComment: '--',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],
    autoClosingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"', notIn: ['string']},
        {open: "'", close: "'", notIn: ['string', 'comment']},
        {open: '`', close: '`', notIn: ['string', 'comment']},
    ],
    surroundingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"'},
        {open: "'", close: "'"},
        {open: '`', close: '`'},
    ],
    wordPattern: /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+[{\]}\\|;:'",./?\s]+)/g,
};

interface LanguageOptions {
    ansi?: boolean;
}
export function getLanguage({ansi = false}: LanguageOptions = {}): languages.IMonarchLanguage &
    Record<string, unknown> {
    return {
        defaultToken: 'text',
        ignoreCase: true,

        brackets: [
            {open: '[', close: ']', token: 'delimiter.square'},
            {open: '(', close: ')', token: 'delimiter.parenthesis'},
            {open: '{', close: '}', token: 'delimiter.curly'},
        ],

        constants: ['true', 'false', 'enabled', 'disabled'],

        operators: [
            '+',
            '-',
            '/',
            '//',
            '%',
            '<@>',
            '@>',
            '<@',
            '&',
            '^',
            '~',
            '<',
            '>',
            '<=',
            '>=',
            '=>',
            '==',
            '!=',
            '<>',
            '=',
        ],

        symbols: /[=><!~?:&|+\-*/^%]+/,
        escapes: /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        variables: /[a-zA-Z_]\w*/,
        tokenizer: (ansi ? tokenizerAnsi : tokenizer) as languages.IMonarchLanguage['tokenizer'],
    };
}
