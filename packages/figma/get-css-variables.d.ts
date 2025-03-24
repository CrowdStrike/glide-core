/**
 * Reads the `.tokens.json` files generated from the previous step to
 * generate CSS variables, grouped by collection and mode,
 * from all of the Design Tokens. This function will return an
 * object in the following pattern:
 *
 * {
 *   "collection-1-mode-1": [
 *     "variable-1: #000000",
 *     "variable-2: #000001",
 *   ],
 *   "collection-1-mode-2": [
 *     "variable-1: #000000",
 *     "variable-2: #000001",
 *   ],
 *   "collection-2": [
 *     "variable-1: #ffffff,
 *     "variable-2: #000001,
 *   ]
 * }
 *
 * Each variable follows this naming convention to align with Design:
 *
 * --glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
 *   * = optional
 *
 */
declare const _default: (directory: string) => Promise<Record<string, string[]>>;
export default _default;
