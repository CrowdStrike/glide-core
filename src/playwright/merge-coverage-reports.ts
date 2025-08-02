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
import {
  coverageReportDirectory,
  coverageReportJsonFilename,
  outputDirectory,
} from './constants.js';

// eslint-disable-next-line no-console
console.log('process.argv', process.argv);

// 1. Create an empty coverage map to merge coverage reports into.
const coverageMap = istanbulLibCoverage.createCoverageMap({});

// TODO: put path into a variable and also add a comment
// to package json and synchronize saying to update constant?
//
// CI downloads the coverage report from every shard and will suffix it with the
// shard number.
const coverageReportDirectories = await globby(
  path.join(outputDirectory, 'coverage-report-*'),
  {
    onlyDirectories: true,
  },
);

// 2. Read the coverage map from every shard, then merge it into our empty
//    coverage map.
for (const directory of coverageReportDirectories) {
  const json = readFileSync(
    path.join(directory, coverageReportJsonFilename),
    'utf8',
  );

  // TODO: add error handlign
  coverageMap.merge(JSON.parse(json) as CoverageMapData);
}

// 3. Get the options passed into the coverage reporter via `playwright.config.js`.
// TODO: add error handlign
const { reporters, thresholds } = JSON.parse(
  readFileSync(
    // Every coverage report will have the same `options.json`. But the number of
    // shards is configurable. So there may not always be `coverage-report-10`. But
    // there will always be `coverage-report-1` because there will always be at least
    // one shard.
    path.join(process.cwd(), outputDirectory, 'coverage-report-1/options.json'),
    'utf8',
  ),
) as Options;

// 4. Generate a combined coverage report.
const context = createContext({
  coverageMap,
  // TODO: what to do about ignoring options.outputDir
  // The directory to which Istanbul will write the combined report.
  dir: path.join(process.cwd(), outputDirectory, coverageReportDirectory),
  // TODO: say what this is
  // The report will include links to files

  // TODO: try removing this
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

  if (name === 'html') {
    create(name, {
      ...options,
      // linkMapper: {
      //   assetPath(node, path) {
      //     // eslint-disable-next-line no-console
      //     console.log('assetPath', path);
      //     return path;
      //   },
      //   getPath(stringOrNode) {
      //     // eslint-disable-next-line no-console
      //     console.log('getPath', stringOrNode);

      //     return typeof stringOrNode === 'string' ? stringOrNode : 'test';
      //   },
      //   relativePath(stringOrNode) {
      //     // eslint-disable-next-line no-console
      //     console.log('relativePath', stringOrNode);

      //     return typeof stringOrNode === 'string' ? stringOrNode : 'test';
      //   },
      // },
    }).execute(context);
  } else {
    create(name, options).execute(context);
  }
}

const hasHtmlReport = reporters.some(([name]) => {
  return name === 'html';
});

if (hasHtmlReport) {
  // TODO: say why inline
  // We need
  const html = await inlineSource(
    path.resolve(
      path.join(
        process.cwd(),
        outputDirectory,
        coverageReportDirectory,
        'index.html',
      ),
    ),
    {
      attribute: false,
      rootpath: path.join(
        process.cwd(),
        outputDirectory,
        coverageReportDirectory,
      ),
    },
  );

  writeFileSync(
    path.join(
      process.cwd(),
      outputDirectory,
      coverageReportDirectory,
      'index.html',
    ),
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
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
