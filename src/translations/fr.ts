import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [] as const;

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
  noAvailableOptions: 'Aucune option disponible',
  noMatchingOptions: 'Aucune option correspondante',
  tooltip: 'Info-bulle :',
  severityInformational: 'Sévérité : Information',
  severityCritical: 'Sévérité : Critique',
  severityMedium: 'Sévérité : Moyenne',
  severityHigh: 'Sévérité : Élevée',
  success: 'Réussite :',
  error: 'Erreur :',
  informational: 'Information :',
  loading: 'Chargement',
  add: 'Ajouter',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Nombre de caractères ${current} sur ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Effacer l'entrée ${label}`,
  editOption: (label: string) => `Modifier l'option : ${label}`,
  editTag: (label: string) => `Modifier la balise : ${label}`,
  removeTag: (label: string) => `Enlever la balise : ${label}`,
  itemCount: (count: string) => `${count} éléments`,
  maximum: (label: string) => `Valeur maximale pour ${label}`,
  setMaximum: (label: string) => `Définir une valeur maximale pour ${label}`,
  minimum: (label: string) => `Valeur minimale pour ${label}`,
  setMinimum: (label: string) => `Définir une valeur minimale pour ${label}`,
};

export default translation;
