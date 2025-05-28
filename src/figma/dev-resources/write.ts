import { mkdir, writeFile } from 'node:fs/promises';
import { type DevResource } from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { resourcesDirectory } from './constants.js';

/**
 * Writes the dev resources to disk. Having them on disk helps with
 * debugging by letting us manually verify them against what's shown
 * in Figma's UI.
 */
export default async (resources: DevResource[]) => {
  const spinner = yoctoSpinner({
    text: 'Writing dev resources…\n',
  }).start();

  try {
    await mkdir(resourcesDirectory, { recursive: true });

    await writeFile(
      `${resourcesDirectory}/resources.json`,
      JSON.stringify(resources, null, 2),
    );

    spinner.success(
      `Dev resource files have been written to the "${resourcesDirectory}" directory.`,
    );
  } catch (error) {
    spinner.error('An error occurred writing the dev resources to disc.');
    throw error;
  }
};
