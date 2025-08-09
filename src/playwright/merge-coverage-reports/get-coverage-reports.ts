import { readFileSync } from 'node:fs';
import path from 'node:path';
import { type CoverageMapData } from 'istanbul-lib-coverage';
import { globby } from 'globby';
import getConfiguration from './get-configuration.js';

export default async () => {
  const { coverageReporterOutputDir, jsonReporterFile, playwrightOutputDir } =
    getConfiguration();

  const directories = await globby(
    // CI will download the coverage report from every shard and will suffix each
    // report with the shard number.
    path.join(playwrightOutputDir, `${coverageReporterOutputDir}-*`),
    {
      onlyDirectories: true,
    },
  );

  if (directories.length === 0) {
    throw new Error(
      `Didn't find any reports matching the following glob: ${path.join(playwrightOutputDir, `${coverageReporterOutputDir}-*`)}.`,
    );
  }

  return directories.map((directory) => {
    const reportPath = path.join(directory, jsonReporterFile);
    let json: string;

    // eslint-disable-next-line no-console
    console.log(`- Read: ${reportPath}`);

    try {
      json = readFileSync(reportPath, 'utf8');
    } catch {
      throw new Error(`Failed to read the report at ${reportPath}.`);
    }

    // eslint-disable-next-line no-console
    console.log(`- Parse ${reportPath}`);

    try {
      return JSON.parse(json) as CoverageMapData;
    } catch {
      throw new Error(`Failed to parse the report at ${reportPath}.`);
    }
  });
};
