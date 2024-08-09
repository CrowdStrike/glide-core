import type { Translation } from '../library/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'French',
  $dir: 'ltr',

  // These come from ./fr.json
  close: 'Fermer',
  dismiss: 'Congédier',
  open: 'Ouvrir',
  selectAll: 'Tout sélectionner',
  moreInformation: 'Plus d’informations',
  notifications: 'Notifications',
  nextTab: '',
  previousTab: '',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Character count ${current} of ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Clear ${label} entry`,
  removeTag: (label: string) => `Supprimer la balise : ${label}`,
};

export default translation;
