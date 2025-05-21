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

  const token = process.env.FIGMA_TOKEN;

  const spinner = yoctoSpinner({
    text: `Updating ${resources.length} dev resources…\n`,
  }).start();

  if (!token) {
    throw new Error(
      '"FIGMA_TOKEN" is a required environment variable. See [`CONTRIBUTING.md`](https://github.com/CrowdStrike/glide-core/blob/main/CONTRIBUTING.md#updating-dev-resources) for more information.',
    );
  }

  // https://www.figma.com/developers/api#post-dev-resources-endpoint
  const response = await fetch(`https://api.figma.com/v1/dev_resources/`, {
    method: 'PUT',
    headers: {
      'X-FIGMA-TOKEN': token,
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
    // the errors array.""
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
