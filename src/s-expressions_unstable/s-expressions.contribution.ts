import {registerLanguage} from '../_.contribution';

export const LANGUAGE_ID = 's-expression_unstable';

registerLanguage({
    id: LANGUAGE_ID,
    extensions: [],
    loader: () => import('./s-expressions'),
});
