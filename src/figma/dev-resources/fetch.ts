import { type GetDevResourcesResponse } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { figmaFileId } from './constants.js';

/**
 * Fetches the dev resources from Figma's API¹ and returns them.
 */
export default async () => {
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    throw new Error(
      '"FIGMA_TOKEN" is a required environment variable. See [`CONTRIBUTING.md`](https://github.com/CrowdStrike/glide-core/blob/main/CONTRIBUTING.md#updating-dev-resources) for more information.',
    );
  }

  const spinner = yoctoSpinner({
    text: 'Fetching Figma dev resources…',
  }).start();

  // https://www.figma.com/developers/api#get-dev-resources-endpoint
  const response = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/dev_resources`,
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

  const resources = (await response.json()) as GetDevResourcesResponse;

  spinner.success('Figma dev resources collected.');

  return resources.dev_resources;
};
