import { type DevResource } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { figmaFileId } from './constants.js';

/**
 * Deletes the provided resources from Figma's API.
 */
export default async (resources: DevResource[]) => {
  if (resources.length === 0) {
    return;
  }

  const spinner = yoctoSpinner({
    text: `Deleting ${resources.length} dev resources…\n`,
  }).start();

  await deleteInBatches(resources);

  spinner.success(`Deleted ${resources.length} dev resources.`);
};

function sleep(milliseconds = 1000) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Figma rate limits this endpoint aggressively and doesn't provide
// a way to batch-delete resources. So we're stuck with batching
// ourselves. I found in testing that delaying slightly between each
// request and then delaying longer between batches seems to keep us
// from getting hit with a 429 status code.
async function deleteInBatches(resources: DevResource[]) {
  const resourceIds = resources.map((resource) => resource.id);

  async function loop() {
    const batchedIds = resourceIds.splice(0, 5);
    const hasResourcesToDelete = resourceIds.length;

    for (const id of batchedIds) {
      const response = await fetch(
        `https://api.figma.com/v1/files/${figmaFileId}/dev_resources/${id}`,
        {
          method: 'DELETE',
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
          `Deleting dev resource "${id}" returned a ${response.status} error code.`,
        );
      }

      await sleep(1000);
    }

    if (hasResourcesToDelete) {
      await sleep(5000);
      return loop();
    }
  }

  await loop();
}
