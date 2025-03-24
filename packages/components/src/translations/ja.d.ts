import type { Translation } from '../library/localize.js';
export declare const PENDING_STRINGS: readonly ["severityInformational", "severityCritical", "severityMedium", "success", "error", "informational"];
type PendingTranslation = (typeof PENDING_STRINGS)[number];
declare const translation: Omit<Translation, PendingTranslation>;
export default translation;
