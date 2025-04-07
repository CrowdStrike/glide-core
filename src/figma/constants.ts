// There are some extended variables we need to
// make available internally. This array captures
// those unique cases.
//
// Each string in this array should align with
// the variable format in Figma:
//
// {collection}/{group(s)}/{variable}
//
// This information can be found in Figma's
// Deatils modal when clicking on an extended
// style by combining the collection information
// with the variable's full name.
export const extendedVariables = [
  'Color/Button/Icon/primary',
  'Color/Button/Text/primary',
  'Color/Button/Stroke/default',
  'Color/Button/Surface/active',
  'Color/Checkbox/Icon/default--disabled',
  'Color/Checkbox/Surface/background-idle',
  'Color/Checkbox/Surface/background-selected--default',
  'Color/Dialog and Modal/Surface/container',
  'Color/Radio/Icon/default--disabled',
  'Color/Tabs/Stroke/underline',
  'Color/Template/Surface/container-detail',
  'Color/Tooltip/Surface/container',
  'Color/Tooltip/Text/shortcut',
  'Tag/Stroke/freeTrial',
  'Tag/Stroke/new',
  'Tag/Stroke/updated',
  'Tag/Surface/freeTrial',
  'Tag/Surface/new',
  'Tag/Surface/updated',
];

export const figmaFileId = 'A4B1kaT5HVLqcijwK4GXzt';
export const tokensDirectory = 'tokens';
export const stylesheetsDirectory = 'src/styles/variables';
