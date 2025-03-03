import { type GetLocalVariablesResponse } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';

/**
 * Fetches the variables from Figma's API and returns them as JSON.
 *
 * https://www.figma.com/developers/api?fuid=1111467023992153920#variables
 */
export default async ({ token, fileId }: { token: string; fileId: string }) => {
  if (!token) {
    throw new Error(
      '"FIGMA_TOKEN" is a required environment variable. See [`CONTRIBUTING.md`](https://github.com/CrowdStrike/glide-core/blob/main/CONTRIBUTING.md#updating-style-variables) for more information.',
    );
  }

  const spinner = yoctoSpinner({ text: 'Fetching Figma variables…' }).start();
  let tokens: GetLocalVariablesResponse;

  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileId}/variables/local?scopes=file_variables:read&branch_data=true`,
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

    tokens = (await response.json()) as GetLocalVariablesResponse;

    if (tokens.error) {
      throw new Error("Figma's API returned an unknown error.");
    }

    spinner.success('Figma variables collected.');

    return tokens;
  } catch (error) {
    spinner.error('An error occurred fetching the tokens from Figma.');
    throw error;
  }
};
