// There are a handful of extended variables we
// need to make available. This array captures
// those unique cases.
//
// Each string in this array should align with
// the variable format in Figma:
//
// {collection}/{group(s)}/{variable}
//
// The collection must be manually added, but
// one can copy the rest of the variable's name
// from Figma's Details modal.
export const extendedVariables = [
  'Color/Button/Icon/primary',
  'Color/Button/Text/primary',
  'Color/Button/Stroke/default',
  'Color/Dialog and Modal/Surface/container',
];

export const figmaFileId = 'A4B1kaT5HVLqcijwK4GXzt';
export const tokensDirectory = 'tokens';
export const stylesheetsDirectory = 'src/styles/variables';
