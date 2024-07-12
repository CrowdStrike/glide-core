import type { Translation } from '../library/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  close: 'Close',
  dismiss: 'Dismiss',
  open: 'Open',
  selectAll: 'Select all',
  clearEntry: 'Clear entry',
  moreInformation: 'More information',
  notifications: 'Notifications',

  removeTag: (label: string) => `Remove tag: ${label}`,
};

export default translation;
