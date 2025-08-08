import { type JsonOptions } from 'istanbul-reports';
import type { FullConfig } from '@playwright/test';
import playwrightConfiguration from '../playwright.config.js';
import { type CoverageReporterOptions } from '../coverage-reporter.js';

const { reporter, outputDir } = playwrightConfiguration as FullConfig & {
  // `outputDir` is a valid configuration key. But it's not on the type because, in
  // practice, Playwright inlines it into each project in `projects`.
  outputDir?: string;
};

if (!outputDir) {
  throw new Error("`outputDir` is missing from Playwright's configuration.");
}

const playwrightOutputDirectory = outputDir;
const coverageReporter = reporter.find(([name]) => name.includes('coverage'));

const {
  outputDir: coverageReporterOutputDirectory,
  reporters,
  thresholds,
} = coverageReporter?.at(1) as CoverageReporterOptions;

const jsonReporter = reporters.find(
  (reporter): reporter is ['json', JsonOptions] => reporter.at(0) === 'json',
);

// The non-null assertion so importers don't have to check if it's undefined. We
// throw below if it is.
//
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
const jsonReporterFile = jsonReporter?.[1]?.file!;

if (!jsonReporter) {
  throw new Error("The reporter's configuration is missing a 'json' report.");
}

if (!jsonReporterFile) {
  throw new Error("The reporter's JSON report is missing a `file` option.");
}

/* eslint-disable no-console */
console.log(
  `- \`coverageReporterOutputDirectory\`: ${coverageReporterOutputDirectory}`,
);

console.log(`- \`jsonReporterFile\`: ${jsonReporterFile}`);
console.log(`- \`reporters\`: ${JSON.stringify(reporters)}`);
console.log(`- \`thresholds\`: ${JSON.stringify(thresholds)}`);
/* eslint-enable no-console */

export {
  coverageReporterOutputDirectory,
  jsonReporterFile,
  playwrightOutputDirectory,
  reporters,
  thresholds,
};
