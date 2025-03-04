import type { DesignToken } from './types.js';

/**
 * Type guard to verify a provided object is a Design Token.
 * Used across multiple files for type narrowing.
 */
export default (object: unknown): object is DesignToken => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  return '$type' in object && '$value' in object;
};
