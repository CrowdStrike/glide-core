import type { Translation } from '../library/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  // All of these should have corresponding entries in ./en.json,
  // using ICU message syntax in place of any of dynamic functions
  close: 'Close',
  dismiss: 'Dismiss',
  open: 'Open',
  selectAll: 'Select all',
  clearEntry: 'Clear entry',
  moreInformation: 'More information',
  nextTab: 'Next tab',
  notifications: 'Notifications',
  previousTab: 'Previous tab',

  removeTag: (label: string) => `Remove tag: ${label}`,
};

export default translation;
