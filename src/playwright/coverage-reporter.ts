import { readFileSync } from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import type {
  FullConfig,
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import { createContext } from 'istanbul-lib-report';
import istanbulLibCoverage from 'istanbul-lib-coverage';
import convertSourceMap from 'convert-source-map';
import {
  create,
  type HtmlOptions,
  type JsonOptions,
  type LcovOptions,
  type TextOptions,
  type TextSummaryOptions,
} from 'istanbul-reports';
import v8ToIstanbul from 'v8-to-istanbul';
import { type EncodedSourceMap } from '@jridgewell/trace-mapping';
import { isMatch } from 'matcher';
import { v8CoverageAttachmentName } from './constants.js';
import playwrightConfiguration from './playwright.config.js';

export interface CoverageReporterOptions {
  include: string[];
  outputDir: string;
  reporters: (
    | ['html']
    | ['html', HtmlOptions]
    | ['json']
    | ['json', JsonOptions]
    | ['lcov']
    | ['lcov', LcovOptions]
    | ['text']
    | ['text', TextOptions]
    | ['text-summary']
    | ['text-summary', TextSummaryOptions]
  )[];
  thresholds: {
    statements: number;
    functions: number;
    branches: number;
    lines: number;
  };
}

interface V8Coverage {
  result: {
    functions: {
      functionName: string;
      isBlockCoverage: boolean;
      ranges: { startOffset: number; endOffset: number; count: number }[];
    }[];
    scriptId: string;
    source: string;
    url: string;
  }[];
}

export default class CoverageReporter implements Reporter {
  onBegin(configuration: FullConfig) {
    if (process.env.PLAYWRIGHT_SKIP_COVERAGE) {
      return;
    }

    this.#isSharded = configuration.shard !== null;
    this.#sourceCode.clear();
    this.#sourceMaps.clear();
    this.#v8Coverage = { result: [] };
  }

  async onEnd(result: FullResult) {
    if (
      result.status === 'interrupted' ||
      !this.#wasCoverageCollected ||
      process.env.PLAYWRIGHT_SKIP_COVERAGE
    ) {
      return;
    }

    const coverageMap = await this.#convertV8ToIstanbul();

    const { outputDir } = playwrightConfiguration as FullConfig & {
      // `outputDir` is a valid configuration key. But it's not on the type because, in
      // practice, Playwright inlines it into each project in `projects`.
      outputDir?: string;
    };

    if (!outputDir) {
      throw new Error(
        "`outputDir` is missing from Playwright's configuration.",
      );
    }

    const context = createContext({
      coverageMap,

      // The directory to which Istanbul will write reports.
      dir: path.join(outputDir, this.#options.outputDir),

      // Istanbul uses tuples for thresholds ("watermarks"). The first number is the
      // failure level. The second is the success level. In between those two numbers
      // is the warning level.
      //
      // We're not concerned with warnings. So we take each threshold and use it for both
      // failure and success. In other words, anything below a threshold in `thresholds`
      // is counted as a failure.
      watermarks: {
        branches: [
          this.#options.thresholds.branches,
          this.#options.thresholds.branches,
        ],
        functions: [
          this.#options.thresholds.functions,
          this.#options.thresholds.functions,
        ],
        lines: [this.#options.thresholds.lines, this.#options.thresholds.lines],
        statements: [
          this.#options.thresholds.statements,
          this.#options.thresholds.statements,
        ],
      },
    });

    // The only way we know for sure that the coverage report is being served is if
    // Playwright was started with this NPM script, which starts the coverage report
    // server for developers.
    if (process.env.npm_lifecycle_event === 'test:development:playwright') {
      // eslint-disable-next-line no-console
      console.log('\n');

      // eslint-disable-next-line no-console
      console.log('Coverage report available at: http://localhost:6008');
    }

    for (const [name, options] of this.#options.reporters) {
      if (['text', 'text-summary'].includes(name)) {
        // Both "text" and "text-summary" are logged to the console. So we put some
        // vertical space between them to make the overall output more readable.
        //
        // eslint-disable-next-line no-console
        console.log('\n');
      }

      create(name, options).execute(context);
    }

    const { branches, lines, functions, statements } =
      coverageMap.getCoverageSummary();

    const areThresholdsMet =
      branches.pct >= this.#options.thresholds.branches &&
      lines.pct >= this.#options.thresholds.lines &&
      functions.pct >= this.#options.thresholds.functions &&
      statements.pct >= this.#options.thresholds.statements;

    if (!areThresholdsMet && !this.#isSharded) {
      result.status = 'failed';
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (process.env.PLAYWRIGHT_SKIP_COVERAGE) {
      return;
    }

    const coverageAttachment = result.attachments.find(
      ({ name }) => name === v8CoverageAttachmentName,
    );

    // `path` won't be defined in the case of a fatal error or if the browser against
    // which the test ran isn't Chromium.
    if (coverageAttachment?.path) {
      this.#wasCoverageCollected = true;
      this.#addV8Coverage(coverageAttachment.path);
    }
  }

  constructor(options: CoverageReporterOptions) {
    this.#options = options;
  }

  #isSharded = false;

  #options: CoverageReporterOptions;

  #sourceCode = new Map<string, string>();

  #sourceMaps = new Map<string, EncodedSourceMap>();

  #v8Coverage: V8Coverage = { result: [] };

  #wasCoverageCollected = false;

  #addV8Coverage(path: string) {
    let v8Coverage: V8Coverage;

    try {
      const json = readFileSync(path, 'utf8');
      v8Coverage = JSON.parse(json) as V8Coverage;
    } catch {
      throw new Error(`Failed to read or parse the coverage file at: ${path}.`);
    }

    for (const script of v8Coverage.result) {
      const sourceMap = convertSourceMap.fromSource(script.source);

      if (sourceMap !== null) {
        this.#sourceMaps.set(
          script.url,
          sourceMap.sourcemap as EncodedSourceMap,
        );

        this.#sourceCode.set(script.url, script.source);
      }
    }

    this.#v8Coverage = {
      result: [...this.#v8Coverage.result, ...v8Coverage.result],
    };
  }

  async #convertV8ToIstanbul() {
    const coverageMap = istanbulLibCoverage.createCoverageMap({});

    for (const script of this.#v8Coverage.result) {
      const sourceCode = this.#sourceCode.get(script.url);
      const sourceMap = this.#sourceMaps.get(script.url);
      const { pathname } = new URL(script.url);

      if (sourceCode && sourceMap) {
        const convertor = v8ToIstanbul(
          path.join(path.join(process.cwd(), pathname)),
          0,
          {
            source: sourceCode,
            sourceMap: { sourcemap: sourceMap },
          },
          (filename) => {
            return !isMatch(
              path.relative(process.cwd(), filename),
              this.#options.include,
            );
          },
        );

        await convertor.load();

        convertor.applyCoverage(script.functions);
        coverageMap.merge(convertor.toIstanbul());
      }
    }

    return coverageMap;
  }
}
