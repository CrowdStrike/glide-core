import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = ['collapse', 'expand'] as const;

type PendingTranslation = (typeof PENDING_STRINGS)[number];

const translation: Omit<Translation, PendingTranslation> = {
  $code: 'fr',
  $name: 'French',
  $dir: 'ltr',

  // These come from ./fr.json
  close: 'FERMER',
  dismiss: 'Ignorer',
  selectAll: 'Tout sélectionner',
  notifications: 'Notifications',
  nextTab: 'Onglet suivant',
  previousTab: 'Onglet précédent',
  noResults: 'Aucun résultat trouvé',
  tooltip: 'Info-bulle :',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Nombre de caractères ${current} sur ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Effacer l'entrée ${label}`,
  editOption: (label: string) => `Modifier l'option : ${label}`,
  editTag: (label: string) => `Modifier la balise : ${label}`,
  removeTag: (label: string) => `Enlever la balise : ${label}`,
  actionsFor: (label: string) => `Action pour ${label}`,
  itemCount: (count: string) => `${count} éléments`,
  closeInlineAlert: (variant: string) => `Fermer l'alerte ${variant}`,
};

export default translation;
