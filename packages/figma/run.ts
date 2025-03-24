import fetchFigmaVariables from './fetch-figma-variables.js';
import getCSSVariables from './get-css-variables.js';
import getDesignTokens from './get-design-tokens.js';
import writeDesignTokens from './write-design-tokens.js';
import writeStylesheets from './write-stylesheets.js';

const figmaToken = process.env.FIGMA_TOKEN ?? '';
const figmaFileId = 'A4B1kaT5HVLqcijwK4GXzt';
const tokensDirectory = 'tokens';
const stylesheetsDirectory = 'stylesheets';

/**
 * Queries Figma's API for variables. Converts those
 * variables into a Design Token format. Uses the Design
 * Tokens to build CSS custom properties, grouped by
 * the Figma collection.  Writes stylesheets for each
 * Figma collection with the CSS custom properties.
 *
 * This process has many layers and requires a general understanding
 * of Figma variables, collections, and modes¹. A general understanding
 * of the W3C Design Token format draft² is also recommended.
 *
 * 1: https://github.com/open-wc/custom-elements-manifest/blob/e7ec7424aa418b220fc4ec7e70464b4d6f35b596/packages/analyzer/src/features/analyse-phase/creators/createClass.js#L151-L153
 * 2: https://tr.designtokens.org/format
 */
async function run() {
  const figmaVariables = await fetchFigmaVariables({
    fileId: figmaFileId,
    token: figmaToken,
  });

  const tokens = getDesignTokens(figmaVariables);

  await writeDesignTokens({
    directory: tokensDirectory,
    tokens,
  });

  const cssVariables = await getCSSVariables(tokensDirectory);

  await writeStylesheets({ directory: stylesheetsDirectory, cssVariables });
}

await run();
