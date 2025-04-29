import {suggestionIndexToWeight} from '../../../utils';
import {wrapStringToBackticks} from '../utils';

describe('wrapStringToBackticks', () => {
    it('should return the same string if it already starts and ends with backticks', () => {
        expect(wrapStringToBackticks('`test`')).toBe('`test`');
    });

    it('should wrap the string with backticks if it contains special symbols', () => {
        expect(wrapStringToBackticks("test'")).toBe("`test'`");
        expect(wrapStringToBackticks('test "')).toBe('`test "`');
        expect(wrapStringToBackticks('test-')).toBe('`test-`');
        expect(wrapStringToBackticks('test@')).toBe('`test@`');
        expect(wrapStringToBackticks('test/')).toBe('`test/`');
        expect(wrapStringToBackticks('test\' " - / @')).toBe('`test\' " - / @`');
    });

    it('should not wrap the string with backticks if it is empty', () => {
        expect(wrapStringToBackticks('')).toBe('');
    });

    it('should not wrap the string with backticks if it does not contain special symbols', () => {
        expect(wrapStringToBackticks('test1234')).toBe('test1234');
    });

    it('should handle strings with only special symbols', () => {
        expect(wrapStringToBackticks("'")).toBe("`'`");
        expect(wrapStringToBackticks('-')).toBe('`-`');
        expect(wrapStringToBackticks('@')).toBe('`@`');
        expect(wrapStringToBackticks('/')).toBe('`/`');
    });

    it('should handle strings with leading and trailing spaces', () => {
        expect(wrapStringToBackticks('  test  ')).toBe('`  test  `');
    });

    it('should handle strings with only spaces', () => {
        expect(wrapStringToBackticks('   ')).toBe('`   `');
    });
});

describe('suggestionIndexToWeight', () => {
    it('should return a single character for indices within the alphabet', () => {
        expect(suggestionIndexToWeight(0)).toBe('a');
        expect(suggestionIndexToWeight(25)).toBe('z');
    });

    it('should handle indices beyond the alphabet length', () => {
        expect(suggestionIndexToWeight(26)).toBe('za');
        expect(suggestionIndexToWeight(51)).toBe('zz');
        expect(suggestionIndexToWeight(78)).toBe('zzza');
    });

    it('should correctly handle edge cases', () => {
        expect(suggestionIndexToWeight(0)).toBe('a');
        expect(suggestionIndexToWeight(25)).toBe('z');
        expect(suggestionIndexToWeight(26)).toBe('za');
        expect(suggestionIndexToWeight(51)).toBe('zz');
        expect(suggestionIndexToWeight(700)).toBe('zzzzzzzzzzzzzzzzzzzzzzzzzzy');
    });
});
