import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import {getSuggestionsGetter} from './yqlAutocomplete';
import type {YQLAutocompleteConfig} from './yqlAutocomplete';

const completionProvider = new Map<string, monaco.IDisposable>();

function disableCodeSuggestions(langId: string): void {
    const provider = completionProvider.get(langId);
    if (provider) {
        provider.dispose();
    }
}

export function registerCompletionItemProvider(
    langId: string,
    triggerCharacters: string[],
    config: YQLAutocompleteConfig,
) {
    disableCodeSuggestions(langId);
    const provider = monaco.languages.registerCompletionItemProvider(langId, {
        triggerCharacters: triggerCharacters,
        provideCompletionItems: getSuggestionsGetter(config),
    });
    completionProvider.set(langId, provider);
}
