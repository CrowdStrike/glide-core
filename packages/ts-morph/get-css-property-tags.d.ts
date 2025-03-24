import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json';
declare const _default: (declaration: (typeof manifest)["modules"][number]["declarations"][number]) => OptionalKind<JSDocTagStructure>[];
export default _default;
