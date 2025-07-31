import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import istanbulLibCoverage, {
  type CoverageMapData,
} from 'istanbul-lib-coverage';
import { createContext } from 'istanbul-lib-report';
import { globby } from 'globby';
import { create } from 'istanbul-reports';
import { inlineSource } from 'inline-source';
import { type Options } from './coverage-reporter.js';

const coverageMap = istanbulLibCoverage.createCoverageMap({});

const coverageDirectories = await globby('playwright-coverage-*', {
  onlyDirectories: true,
});

for (const directory of coverageDirectories) {
  const json = readFileSync(path.join(directory, 'coverage.json'), 'utf8');
  coverageMap.merge(JSON.parse(json) as CoverageMapData);
}

const { reporters, thresholds } = JSON.parse(
  readFileSync(
    path.join(process.cwd(), `playwright-coverage-1/options.json`),
    'utf8',
  ),
) as Options;

const context = createContext({
  coverageMap,
  dir: path.join(process.cwd(), 'playwright-coverage'),
  sourceFinder(path) {
    try {
      return readFileSync(path, 'utf8');
    } catch {
      throw new Error(`Failed to read ${path}.`);
    }
  },
  // Istanbul uses tuples for thresholds ("watermarks"). The first number is the
  // failure level. The second is the success level. In between is the warning level.
  //
  // We're not concerned with warnings. So we take each threshold and use it for both
  // failure and success. In other words, anything below a threshold in `thresholds`
  // is counted as a failure.
  watermarks: {
    branches: [thresholds.branches, thresholds.branches],
    functions: [thresholds.functions, thresholds.functions],
    lines: [thresholds.lines, thresholds.lines],
    statements: [thresholds.statements, thresholds.statements],
  },
});

for (const [name, options] of reporters) {
  if (['text', 'text-summary'].includes(name)) {
    // Both "text" and "text-summary" are logged to the console. So we put some
    // vertical space between them to make the output look a little nicer.
    //
    // eslint-disable-next-line no-console
    console.log('\n');
  }

  create(name, options).execute(context);
}

const hasHtmlReport = reporters.some(([name]) => {
  return name === 'html';
});

if (hasHtmlReport) {
  const html = await inlineSource(
    path.resolve(path.join(process.cwd(), 'playwright-coverage', 'index.html')),
    {
      attribute: false,
      rootpath: path.join(process.cwd(), 'playwright-coverage'),
    },
  );

  writeFileSync(
    path.join(process.cwd(), 'playwright-coverage', 'index.html'),
    html,
  );
}

const { branches, lines, functions, statements } =
  coverageMap.getCoverageSummary();

const areThresholdsMet =
  branches.pct >= thresholds.branches &&
  lines.pct >= thresholds.lines &&
  functions.pct >= thresholds.functions &&
  statements.pct >= thresholds.statements;

if (!areThresholdsMet) {
  throw new Error('TODO');
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
