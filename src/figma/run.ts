import generateStylesheets from './generate-stylesheets.js';
import fetchFigmaVariables from './fetch-figma-variables.js';
import getDesignTokens from './get-design-tokens.js';
import writeTokens from './write-tokens.js';

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
 * of [Figma variables, collections, and modes](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes).
 * A general understanding of the W3C [Design Token format](https://tr.designtokens.org/format)
 * draft is also recommended.
 */
async function run() {
  const variables = await fetchFigmaVariables({
    token: figmaToken,
    fileId: figmaFileId,
  });

  const tokens = getDesignTokens(variables);

  await writeTokens({
    tokens,
    directory: tokensDirectory,
  });

  await generateStylesheets({
    tokensDirectory,
    outputDirectory: stylesheetsDirectory,
  });
}

await run();
