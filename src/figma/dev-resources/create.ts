import {
  type PostDevResourcesRequestBody,
  type PostDevResourcesResponse,
} from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';

/**
 * Creates dev resources with Figma's API.
 */
export default async (
  resources: PostDevResourcesRequestBody['dev_resources'],
) => {
  if (resources.length === 0) {
    return;
  }

  const token = process.env.FIGMA_TOKEN;

  const spinner = yoctoSpinner({
    text: `Creating ${resources.length} dev resources…\n`,
  }).start();

  if (!token) {
    throw new Error(
      '"FIGMA_TOKEN" is a required environment variable. See [`CONTRIBUTING.md`](https://github.com/CrowdStrike/glide-core/blob/main/CONTRIBUTING.md#updating-dev-resources) for more information.',
    );
  }

  // https://www.figma.com/developers/api#post-dev-resources-endpoint
  const response = await fetch(`https://api.figma.com/v1/dev_resources/`, {
    method: 'POST',
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
      `Creating a dev resource returned a ${response.status} error code.`,
    );
  }

  const resourcesResponse = (await response.json()) as PostDevResourcesResponse;

  if (resourcesResponse.errors && resourcesResponse.errors?.length > 0) {
    // "If there are any dev resources that cannot be created, you
    // may still get a 200 response. These resources will show up in
    // the errors array. Some reasons a dev resource cannot be
    // created include:
    //
    // - Resource points to a file_key that cannot be found.
    // - The node already has the maximum of 10 dev resources.
    // - Another dev resource for the node has the same url."
    //
    // https://www.figma.com/developers/api#post-dev-resources-endpoint

    // eslint-disable-next-line no-console
    console.warn('The response was successful, but returned errors:\n');

    for (const error of resourcesResponse.errors) {
      // eslint-disable-next-line no-console
      console.warn(JSON.stringify(error));
    }
  }

  spinner.success(`Created ${resources.length} dev resources.`);
};
