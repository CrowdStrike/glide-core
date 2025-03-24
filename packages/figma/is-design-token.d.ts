import type { DesignToken } from './types.js';
/**
 * Type guard to verify a provided object is a Design Token.
 * Used across multiple files for type narrowing.
 */
declare const _default: (object: unknown) => object is DesignToken;
export default _default;
