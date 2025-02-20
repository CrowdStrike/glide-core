import type { Token } from './types.js';

export default (object: unknown): object is Token => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  return (
    '$type' in object &&
    '$value' in object &&
    (object.$type === 'color' ||
      object.$type === 'number' ||
      object.$type === 'string' ||
      object.$type === 'dimension' ||
      object.$type === 'fontFamily' ||
      object.$type === 'fontWeight') &&
    (typeof object.$value === 'string' ||
      typeof object.$value === 'number' ||
      typeof object.$value === 'object')
  );
};
