import path from 'node:path';

export const coverageReportDirectory = 'coverage-report';
export const coverageReportJsonFilename = 'coverage.json';
export const optionsFilename = 'options.json';
// TODO: can this be combined with `coverageReportDirectory`?
export const outputDirectory = 'dist/playwright';

export const serializedOptionsPath = path.parse(
  'dist/playwright/coverage-report/options.json',
);

export const v8CoverageAttachmentName = 'v8-coverage.json';
