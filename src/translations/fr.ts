import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [
  'editOption',
  'editTag',
  'itemCount',
  'noResults',
  'closeInlineAlert',
  'popover',
  'tooltip',
] as const;

type PendingTranslation = (typeof PENDING_STRINGS)[number];

const translation: Omit<Translation, PendingTranslation> = {
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
  nextTab: 'Onglet suivant',
  previousTab: 'Onglet précédent',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Nombre de caractères ${current} de ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Effacer l'entrée ${label}`,
  removeTag: (label: string) => `Supprimer la balise : ${label}`,
  actionsFor: (label: string) => `Actions pour ${label}`,
};

export default translation;
