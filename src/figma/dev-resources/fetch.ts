import { type GetDevResourcesResponse } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { figmaFileId } from './constants.js';

/**
 * Fetches the dev resources from Figma's API¹ and returns them.
 */
export default async () => {
  const spinner = yoctoSpinner({
    text: 'Fetching Figma dev resources…',
  }).start();

  // https://www.figma.com/developers/api#get-dev-resources-endpoint
  const response = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/dev_resources`,
    {
      method: 'GET',
      headers: {
        // Verified to exist in run.ts.
        //
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN!,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `The Figma API failed with a ${response.status} error code.`,
    );
  }

  const resources = (await response.json()) as GetDevResourcesResponse;

  spinner.success('Figma dev resources fetched.');

  return resources.dev_resources;
};
