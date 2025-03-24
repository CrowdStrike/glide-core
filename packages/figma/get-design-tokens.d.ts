import { type GetLocalVariablesResponse } from '@figma/rest-api-spec';
import { type TokenGroup } from './types.js';
/**
 * Uses the `GetLocalVariablesResponse` meta from Figma's API to
 * generate Design Tokens¹ grouped by the Figma collection.
 *
 * 1: https://tr.designtokens.org/format/#design-token
 */
declare const _default: (meta: GetLocalVariablesResponse["meta"]) => Record<string, TokenGroup>;
export default _default;
