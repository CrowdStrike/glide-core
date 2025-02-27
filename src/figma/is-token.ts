import type { Token } from './types.js';

/**
 * Type guard to verify a provided object is a Token.
 * Used across multiple files for type narrowing.
 */
export default (object: unknown): object is Token => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  return '$type' in object && '$value' in object;
};
