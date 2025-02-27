import type { Token } from './types.js';

/**
 * Convenience method to ensure a provided object
 * is a Token. Used across multiple files in the process
 * for type narrowing.
 */
export default (object: unknown): object is Token => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  return '$type' in object && '$value' in object;
};
