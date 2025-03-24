/**
 * Type guard to verify a provided object is a Design Token.
 * Used across multiple files for type narrowing.
 */
export default (object) => {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    return '$type' in object && '$value' in object;
};
