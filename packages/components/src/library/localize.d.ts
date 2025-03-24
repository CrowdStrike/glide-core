import { LocalizeController as DefaultLocalizationController } from '@shoelace-style/localize';
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';
export declare class LocalizeController extends DefaultLocalizationController<Translation> {
}
export interface Translation extends DefaultTranslation {
    $code: string;
    $name: string;
    $dir: 'ltr' | 'rtl';
    close: string;
    dismiss: string;
    selectAll: string;
    notifications: string;
    nextTab: string;
    previousTab: string;
    noResults: string;
    tooltip: string;
    severityInformational: string;
    severityCritical: string;
    severityMedium: string;
    success: string;
    error: string;
    informational: string;
    announcedCharacterCount: (current: number, maximum: number) => string;
    displayedCharacterCount: (current: number, maximum: number) => string;
    clearEntry: (label: string) => string;
    editOption: (name: string) => string;
    editTag: (name: string) => string;
    removeTag: (name: string) => string;
    itemCount: (count: string) => string;
    closeInlineAlert: (variant: string) => string;
}
