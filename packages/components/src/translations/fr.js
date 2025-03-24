export const PENDING_STRINGS = [
    'severityInformational',
    'severityCritical',
    'severityMedium',
    'success',
    'error',
    'informational',
];
const translation = {
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
    announcedCharacterCount: (current, maximum) => `Nombre de caractères ${current} sur ${maximum}`,
    displayedCharacterCount: (current, maximum) => `${current}/${maximum}`,
    clearEntry: (label) => `Effacer l'entrée ${label}`,
    editOption: (label) => `Modifier l'option : ${label}`,
    editTag: (label) => `Modifier la balise : ${label}`,
    removeTag: (label) => `Enlever la balise : ${label}`,
    itemCount: (count) => `${count} éléments`,
    closeInlineAlert: (variant) => `Fermer l'alerte ${variant}`,
};
export default translation;
