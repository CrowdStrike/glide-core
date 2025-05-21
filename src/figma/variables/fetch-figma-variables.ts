import { type GetLocalVariablesResponse } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { figmaFileId } from './constants.js';

/**
 * Fetches the variables and variable collections from Figma's API
 * and returns them.
 */
export default async () => {
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    throw new Error(
      '"FIGMA_TOKEN" is a required environment variable. See [`CONTRIBUTING.md`](https://github.com/CrowdStrike/glide-core/blob/main/CONTRIBUTING.md#updating-style-variables) for more information.',
    );
  }

  const spinner = yoctoSpinner({ text: 'Fetching Figma variables…' }).start();

  // https://www.figma.com/developers/api?fuid=1111467023992153920#variables
  const response = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/variables/local?scopes=file_variables:read&branch_data=true`,
    {
      method: 'GET',
      headers: {
        'X-FIGMA-TOKEN': token,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `The Figma API failed with a ${response.status} error code.`,
    );
  }

  const tokens = (await response.json()) as GetLocalVariablesResponse;

  if (tokens.error) {
    throw new Error("Figma's API returned an unknown error.");
  }

  if (Object.keys(tokens.meta.variables).length === 0) {
    throw new Error('There were no variables returned in the response.');
  }

  if (Object.keys(tokens.meta.variableCollections).length === 0) {
    throw new Error(
      'There were no variable collections returned in the response.',
    );
  }

  spinner.success('Figma variables collected.');

  return tokens.meta;
};
