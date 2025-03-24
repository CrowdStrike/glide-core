import type { TokenGroup } from './types.js';
/**
 * Writes the tokens to the provided directory. Having them on disk helps with
 * debugging by letting us manually verify them against what's shown in
 * Figma's UI.
 */
declare const _default: ({ directory, tokens, }: {
    directory: string;
    tokens: Record<string, TokenGroup>;
}) => Promise<void>;
export default _default;
