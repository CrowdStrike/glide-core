import { type JsonOptions } from 'istanbul-reports';
import type { FullConfig } from '@playwright/test';
import playwrightConfiguration from '../playwright.config.js';
import { type CoverageReporterOptions } from '../coverage-reporter.js';

export default () => {
  const {
    reporter,
    outputDir: playwrightOutputDir, // eslint-disable-line unicorn/prevent-abbreviations
  } = playwrightConfiguration as FullConfig & {
    // `outputDir` is a valid configuration key. But it's not on the type because, in
    // practice, Playwright inlines it into each project in `projects`.
    outputDir?: string;
  };

  if (!playwrightOutputDir) {
    throw new Error("`outputDir` is missing from Playwright's configuration.");
  }

  const coverageReporter = reporter.find(([name]) => name.includes('coverage'));

  const {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    outputDir: coverageReporterOutputDir,
    reporters,
    thresholds,
  } = coverageReporter?.at(1) as CoverageReporterOptions;

  const jsonReporter = reporters.find(
    (reporter): reporter is ['json', JsonOptions] => reporter.at(0) === 'json',
  );

  const jsonReporterFile = jsonReporter?.[1]?.file;

  if (!jsonReporter) {
    throw new Error(
      "The Coverage Reporter's configuration is missing a 'json' report.",
    );
  }

  if (!jsonReporterFile) {
    throw new Error(
      "The Coverage Reporter's JSON report is missing a `file` option.",
    );
  }

  /* eslint-disable no-console */
  console.log(`- coverageReporterOutputDir: ${coverageReporterOutputDir}`);
  console.log(`- jsonReporterFile: ${jsonReporterFile}`);
  console.log(`- reporters: ${JSON.stringify(reporters)}`);
  console.log(`- thresholds: ${JSON.stringify(thresholds)}`);
  /* eslint-enable no-console */

  return {
    coverageReporterOutputDir,
    jsonReporterFile,
    playwrightOutputDir,
    reporters,
    thresholds,
  };
};
