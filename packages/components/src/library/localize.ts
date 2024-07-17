import {
  LocalizeController as DefaultLocalizationController,
  registerTranslation,
} from '@shoelace-style/localize';
import { IntlMessageFormat } from 'intl-messageformat';
import { default as en } from '../translations/en.json';
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';

// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController<Translation> {
  static {
    registerTranslation({ ...en, $code: 'en', $name: 'English', $dir: 'ltr' });
  }

  override term(
    key: keyof Translation,
    ...arguments__: [] | [Record<string, string>]
  ): string {
    const term = super.term(key);

    if (arguments__.length > 0) {
      const message = new IntlMessageFormat(term, this.lang());
      return message.format(arguments__[0]) as string;
    }

    return term;
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
  clearEntry: string;
  moreInformation: string;
  notifications: string;
  removeTag: string;
}
