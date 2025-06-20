import {
  LocalizeController as DefaultLocalizationController,
  registerTranslation,
} from '@shoelace-style/localize';
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';
import en from '../translations/en.js'; // Register English as the default/fallback language
import fr from '../translations/fr.js';
import ja from '../translations/ja.js';

// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController<Translation> {
  static {
    registerTranslation(en, ja, fr);
  }
}

export interface Translation extends DefaultTranslation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';

  close: string;
  dismiss: string;
  selectAll: string;
  notifications: string;
  nextTab: string;
  previousTab: string;
  noAvailableOptions: string;
  noMatchingOptions: string;
  tooltip: string;
  severityInformational: string;
  severityCritical: string;
  severityMedium: string;
  success: string;
  error: string;
  informational: string;
  loading: string;
  add: string;

  announcedCharacterCount: (current: number, maximum: number) => string;
  displayedCharacterCount: (current: number, maximum: number) => string;
  clearEntry: (label: string) => string;
  editOption: (name: string) => string;
  editTag: (name: string) => string;
  removeTag: (name: string) => string;
  itemCount: (count: string) => string;
  maximum: (label: string) => string;
  setMaximum: (label: string) => string;
  minimum: (label: string) => string;
  setMinimum: (label: string) => string;
}
