import type { Translation } from '../library/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  // All of these should have corresponding entries in ./en.json,
  // using ICU message syntax in place of any of dynamic functions
  close: 'Close',
  dismiss: 'Dismiss',
  selectAll: 'Select all',
  notifications: 'Notifications',
  nextTab: 'Next tab',
  previousTab: 'Previous tab',
  noResults: 'No results found',
  tooltip: 'Tooltip:',
  severityInformational: 'Severity: Informational',
  severityCritical: 'Severity: Critical',
  severityMedium: 'Severity: Medium',
  success: 'Success:',
  error: 'Error:',
  informational: 'Informational:',
  loading: 'Loading',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Character count ${current} of ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Clear ${label} entry`,
  editOption: (label: string) => `Edit option: ${label}`,
  editTag: (label: string) => `Edit tag: ${label}`,
  removeTag: (label: string) => `Remove tag: ${label}`,
  itemCount: (count: string) => `${count} items`,
};

export default translation;
