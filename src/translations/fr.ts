import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [
  'nextTab',
  'previousTab',
  'announcedCharacterCount',
  'displayedCharacterCount',
  'clearEntry',
  'actionsFor',
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

  removeTag: (label: string) => `Supprimer la balise : ${label}`,
};

export default translation;
