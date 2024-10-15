import {
  LocalizeController as DefaultLocalizationController,
  registerTranslation,
} from '@shoelace-style/localize';
import en from '../translations/en.js'; // Register English as the default/fallback language
import fr from '../translations/fr.js';
import ja from '../translations/ja.js';
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';

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
  open: string;
  selectAll: string;
  moreInformation: string;
  notifications: string;
  nextTab: string;
  previousTab: string;
  edit: string;

  announcedCharacterCount: (current: number, maximum: number) => string;
  displayedCharacterCount: (current: number, maximum: number) => string;
  clearEntry: (label: string) => string;
  editTag: (name: string) => string;
  removeTag: (name: string) => string;
  actionsFor: (label: string) => string;
}
