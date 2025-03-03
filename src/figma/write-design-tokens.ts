import { mkdir, writeFile } from 'node:fs/promises';
import yoctoSpinner from 'yocto-spinner';
import type { TokenGroup } from './types.js';

/**
 * Writes the tokens to the provided directory. Having them on disk helps with
 * debugging by letting us manually verify them against what's shown in
 * Figma's UI.
 */
export default async ({
  directory,
  tokens,
}: {
  directory: string;
  tokens: Record<string, TokenGroup>;
}) => {
  const spinner = yoctoSpinner({ text: 'Writing tokens to files…\n' }).start();

  try {
    await mkdir(directory, { recursive: true });

    for (const [fileName, fileContent] of Object.entries(tokens)) {
      await writeFile(
        `${directory}/${fileName}`,
        JSON.stringify(fileContent, null, 2),
      );
    }

    spinner.success(
      `Token files have been written to the "${directory}" directory.`,
    );
  } catch (error) {
    spinner.error('An error occurred writing the tokens to disc.');
    throw error;
  }
};
