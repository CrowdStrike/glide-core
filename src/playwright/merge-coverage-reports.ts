import { readFileSync } from 'node:fs';
import path from 'node:path';
import istanbulLibCoverage, {
  type CoverageMapData,
} from 'istanbul-lib-coverage';
import { createContext, type ReportNode } from 'istanbul-lib-report';
import { globby } from 'globby';
import { create, type LinkMapper, type JsonOptions } from 'istanbul-reports';
import type { FullConfig } from '@playwright/test';
import playwrightConfiguration from './playwright.config.js';
import { type CoverageReporterOptions } from './coverage-reporter.js';

// 1. Gather the information we need from Playwright's configuration.
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

const coverageReportDirectories = await globby(
  // CI will download the coverage report from every shard and will suffix each
  // report with the shard number.
  path.join(playwrightOutputDir, `${coverageReporterOutputDir}-*`),
  {
    onlyDirectories: true,
  },
);

const jsonReporter = reporters.find(
  (reporter): reporter is ['json', JsonOptions] => reporter.at(0) === 'json',
);

const jsonReporterFile = jsonReporter?.[1]?.file;

if (!jsonReporter) {
  throw new Error(
    "The coverage reporter's configuration is missing a 'json' report.",
  );
}

if (!jsonReporterFile) {
  throw new Error(
    "The coverage reporter's JSON report is missing a `file` option.",
  );
}

// 2. Create an empty coverage map to merge coverage data into.
const coverageMap = istanbulLibCoverage.createCoverageMap({});

// 3. Read the coverage map of every shard. Merge each map into our empty
//    coverage map.
for (const directory of coverageReportDirectories) {
  const reportPath = path.join(directory, jsonReporterFile);
  const json = readFileSync(reportPath, 'utf8');

  try {
    coverageMap.merge(JSON.parse(json) as CoverageMapData);
  } catch {
    throw new Error(`Failed to parse the report file at ${reportPath}.`);
  }
}

// 4. Get the coverage context for the combined coverage maps.
const context = createContext({
  coverageMap,
  // The directory to which Istanbul will write the report.
  dir: path.join(playwrightOutputDir, coverageReporterOutputDir),

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

// 5. Write the reports.
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
      // Unchanged from the default implementation¹ except for the addition of
      // `coverageReporterOutputDir` to the `relativePath()` method.
      //
      // 1. https://github.com/istanbuljs/istanbuljs/blob/06eec782dc8a248f0516cdba06b280c410515890/packages/istanbul-reports/lib/html/index.js#L222-L249
      linkMapper: {
        getPath(node: string | ReportNode) {
          if (typeof node === 'string') {
            return node;
          }

          let filePath = node.getQualifiedName();

          if (node.isSummary()) {
            if (filePath === '') {
              filePath = 'index.html';
            } else {
              filePath += `/index.html`;
            }
          } else {
            filePath += `.html`;
          }

          return filePath;
        },
        relativePath(source, target) {
          const sourcePath = path.dirname(this.getPath(source));
          const targetPath = this.getPath(target);
          const isSummaryPageAssetReference = source === 'index.html';

          const isSummaryPageLinkToDetailPage =
            typeof target !== 'string' && targetPath !== 'index.html';

          return isSummaryPageAssetReference || isSummaryPageLinkToDetailPage
            ? path.posix.relative(
                sourcePath,
                `${coverageReporterOutputDir}/${targetPath}`,
              )
            : path.posix.relative(sourcePath, targetPath);
        },
        assetPath(node, name) {
          return this.relativePath(this.getPath(node), name);
        },
      } as LinkMapper,
    }).execute(context);
  } else {
    create(name, options).execute(context);
  }
}

// 6. Verify coverage thresholds.
const { branches, lines, functions, statements } =
  coverageMap.getCoverageSummary();

const areAllThresholdsMet =
  branches.pct >= thresholds.branches &&
  lines.pct >= thresholds.lines &&
  functions.pct >= thresholds.functions &&
  statements.pct >= thresholds.statements;

if (!areAllThresholdsMet) {
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}
