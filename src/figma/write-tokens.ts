import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import yoctoSpinner from 'yocto-spinner';
import type { TokenGroup } from './types.js';

/**
 * Writes all design tokens to disc for convenience and
 * so that they aren't stored solely in memory.
 *
 * Viewing the design tokens in the outputDirectory aids
 * in troubleshooting and verification against Figma's UI.
 */
export default async ({
  outputDirectory,
  tokensGroupedByCollection,
}: {
  outputDirectory: string;
  tokensGroupedByCollection: Record<string, TokenGroup>;
}) => {
  const spinner = yoctoSpinner({ text: 'Writing tokens to files…\n' }).start();

  try {
    if (!existsSync(outputDirectory)) {
      await mkdir(outputDirectory);
    }

    for (const [fileName, fileContent] of Object.entries(
      tokensGroupedByCollection,
    )) {
      await writeFile(
        `${outputDirectory}/${fileName}`,
        JSON.stringify(fileContent, null, 2),
      );
    }

    spinner.success(
      `Token files have been written to the "${outputDirectory}" directory.`,
    );
  } catch (error) {
    spinner.error('An error occurred writing the tokens to disc.');
    throw error;
  }
};
