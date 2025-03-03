import generateStylesheets from './generate-stylesheets.js';
import fetchFigmaVariables from './fetch-figma-variables.js';
import getDesignTokens from './get-design-tokens.js';
import writeDesignTokens from './write-design-tokens.js';

const figmaToken = process.env.FIGMA_TOKEN ?? '';
const figmaFileId = 'A4B1kaT5HVLqcijwK4GXzt';
const tokensDirectory = 'tokens';
const stylesheetsDirectory = 'stylesheets';

/**
 * Queries Figma's API for variables, converts them to a
 * Design Token format, and generates CSS custom property
 * stylesheets from the tokens.
 *
 * This process has many layers and requires a general understanding
 * of Figma variables, collections, and modes¹. A general understanding
 * of the W3C Design Token format draft² is also recommended.
 *
 * 1: https://github.com/open-wc/custom-elements-manifest/blob/e7ec7424aa418b220fc4ec7e70464b4d6f35b596/packages/analyzer/src/features/analyse-phase/creators/createClass.js#L151-L153
 * 2: https://tr.designtokens.org/format
 */
async function run() {
  const variables = await fetchFigmaVariables({
    token: figmaToken,
    fileId: figmaFileId,
  });

  const tokens = getDesignTokens(variables);

  await writeDesignTokens({
    tokens,
    directory: tokensDirectory,
  });

  await generateStylesheets({
    tokensDirectory,
    outputDirectory: stylesheetsDirectory,
  });
}

await run();
