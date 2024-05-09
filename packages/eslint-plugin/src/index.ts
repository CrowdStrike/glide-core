import { consistentReferenceElementDeclarations } from './rules/consistent-reference-element-declarations.js';
import { noPrefixedEventName } from './rules/no-cs-prefixed-event-name.js';
import { preferClosedShadowRoot } from './rules/prefer-closed-shadow-root.js';
import { prefixedClassDeclaration } from './rules/prefixed-lit-element-class-declaration.js';

const rules = {
  'consistent-reference-element-declarations':
    consistentReferenceElementDeclarations,
  'no-cs-prefixed-event-name': noPrefixedEventName,
  'prefer-closed-shadow-root': preferClosedShadowRoot,
  'prefixed-lit-element-class-declaration': prefixedClassDeclaration,
};

export default { rules };
