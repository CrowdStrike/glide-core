import path from 'node:path';

// TODO: this name doesn't make much sense now
export const componentAnnotation = { type: 'COMPONENT_TEST' };
export const v8CoverageAttachmentName = 'v8-coverage.json';

export const serializedOptionsPath = path.parse(
  'dist/playwright/coverage/options.json',
);
