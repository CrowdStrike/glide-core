import {
  type PutDevResourcesRequestBody,
  type PutDevResourcesResponse,
} from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';

/**
 * Updates existing dev resources with Figma's API.
 */
export default async (
  resources: PutDevResourcesRequestBody['dev_resources'],
) => {
  if (resources.length === 0) {
    return;
  }

  const spinner = yoctoSpinner({
    text: `Updating ${resources.length} dev resources…\n`,
  }).start();

  // https://www.figma.com/developers/api#post-dev-resources-endpoint
  const response = await fetch(`https://api.figma.com/v1/dev_resources/`, {
    method: 'PUT',
    headers: {
      // Verified to exist in run.ts.
      //
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dev_resources: resources,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Updating dev resources returned a ${response.status} error code.`,
    );
  }

  const resourcesResponse = (await response.json()) as PutDevResourcesResponse;

  if (resourcesResponse.errors && resourcesResponse.errors?.length > 0) {
    // "If there are any dev resources that cannot be updated, you
    // may still get a 200 response. These resources will show up in
    // the errors array."
    //
    // https://www.figma.com/developers/api#put-dev-resources-endpoint

    // eslint-disable-next-line no-console
    console.warn('The response was successful, but returned errors:\n');

    for (const error of resourcesResponse.errors) {
      // eslint-disable-next-line no-console
      console.warn(JSON.stringify(error));
    }
  }

  spinner.success(`Updated ${resources.length} dev resources.`);
};
