import type {
    CancellationToken,
    IRange,
    Position,
    editor,
    languages,
} from './fillers/monaco-editor-core';

import {suggestionIndexToWeight} from './utils';

export type CompletionListProvider = {
    (content: string, offset: number, signal?: AbortSignal | null): Promise<string[]>;
};

const allUpperCaseRe = new RegExp('^[$A-Z_\\s]+$');

type YqlCompletionType =
    | 'Keyword'
    | 'PragmaName'
    | 'TypeName'
    | 'FunctionName'
    | 'HintName'
    | 'FolderName'
    | 'TableName'
    | 'ClusterName'
    | 'BindingName'
    | 'UnknownName';

const YqlCompletionTypeToMonacoKind: Record<YqlCompletionType, languages.CompletionItemKind> = {
    Keyword: 17,
    PragmaName: 8,
    TypeName: 24,
    FunctionName: 1,
    HintName: 18,
    FolderName: 23,
    TableName: 18,
    ClusterName: 8,
    BindingName: 4,
    UnknownName: 18,
};

export type CompletionData = string | {type: YqlCompletionType; text: string; shift?: number};

export function provideCompletionItems(
    getCompletionList: CompletionListProvider,
    preserveOrder?: boolean,
) {
    return (
        model: editor.ITextModel,
        position: Position,
        context: languages.CompletionContext,
        token: CancellationToken,
    ): languages.ProviderResult<languages.CompletionList> => {
        const controller = new AbortController();
        const signal = controller.signal;
        token.onCancellationRequested(() => {
            controller.abort();
        });
        const prevText = model
            .getLineContent(position.lineNumber)
            .slice(0, position.column - 1)
            .toLowerCase();
        if (context.triggerCharacter === ':' && prevText.slice(-2) !== '::') {
            return {suggestions: []};
        } else if (context.triggerCharacter === '`' && /[^\s.]`$/.test(prevText)) {
            return {suggestions: []};
        }
        return getCompletionList(model.getValue(), model.getOffsetAt(position), signal).then(
            async (data: CompletionData[]) => {
                const suggestions: languages.CompletionItem[] = [];
                for (const item of data) {
                    let labelAsSnippet = '';
                    //languages.CompletionItemKind.Text
                    let kind = 18;
                    let label: string;
                    if (typeof item === 'object') {
                        const {text, type, shift} = item;
                        label = text;
                        kind = YqlCompletionTypeToMonacoKind[type];
                        if (shift) {
                            const pos = text.length - shift;
                            labelAsSnippet = text.slice(0, pos) + '$0' + text.slice(pos);
                        }
                    } else {
                        label = item;
                    }

                    const suggest =
                        label.length > 1
                            ? label.slice(0, -1).replace(/[/[]/g, '\\\\$&') + label.slice(-1)
                            : label;
                    let range: IRange | undefined;
                    if (/[`~!@#%^&*()-=+[{\]}|;:'",.<>/?]/.test(suggest)) {
                        for (let i = 0; i < label.length; i++) {
                            const prefix = (i === 0 ? suggest : suggest.slice(0, -i)).toLowerCase();
                            if (prevText.endsWith(prefix)) {
                                range = {
                                    startLineNumber: position.lineNumber,
                                    startColumn: position.column - prefix.length,
                                    endLineNumber: position.lineNumber,
                                    endColumn: position.column,
                                };
                                break;
                            }
                        }
                    }
                    suggestions.push({
                        label,
                        filterText: allUpperCaseRe.test(label) ? label.toLowerCase() : label,
                        kind,
                        insertText: labelAsSnippet || suggest,
                        //4 - languages.CompletionItemInsertTextRule.InsertAsSnippet
                        //0 - languages.CompletionItemInsertTextRule.None
                        insertTextRules: labelAsSnippet ? 4 : 0,
                        command:
                            label.endsWith('/') || label.endsWith('.`') || label.endsWith('::')
                                ? {id: 'editor.action.triggerSuggest', title: ''}
                                : undefined,
                        //@ts-ignore
                        range,
                    });
                }
                return {
                    suggestions: preserveOrder
                        ? suggestions.map((item, index) => ({
                              ...item,
                              sortText: suggestionIndexToWeight(index),
                          }))
                        : suggestions,
                    incomplete: suggestions.length > 0,
                };
            },
        );
    };
}

export type CompletionLists = Partial<
    Record<`${Uncapitalize<keyof typeof languages.CompletionItemKind>}List`, Readonly<string[]>>
>;

export function getCompletionItemsProvider(
    completions: CompletionLists,
    completionItemKind: typeof languages.CompletionItemKind,
) {
    const suggestions: languages.CompletionItem[] = [];

    for (const value in completionItemKind) {
        if (!isNaN(Number(value))) {
            const name = `${completionItemKind[value].toLowerCase()}List`;
            if (name in completions) {
                for (const label of completions[name as keyof CompletionLists] as string[]) {
                    suggestions.push({
                        label,
                        filterText: allUpperCaseRe.test(label) ? label.toLowerCase() : label,
                        insertText: label,
                        kind: Number(value),
                        range: {startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1},
                    });
                }
            }
        }
    }
    suggestions.sort((a, b) => a.filterText!.localeCompare(b.filterText!));

    return {
        provideCompletionItems(
            model: editor.ITextModel,
            position: Position,
            _context: languages.CompletionContext,
            _token: CancellationToken,
        ): languages.CompletionList | undefined {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endLineNumber: position.lineNumber,
                endColumn: word.endColumn,
            };

            return {suggestions: suggestions.map((s) => ({...s, range}))};
        },
    };
}
