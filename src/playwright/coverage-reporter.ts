import { readFileSync } from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';
import type {
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
  type LcovOptions,
  type TextOptions,
  type TextSummaryOptions,
} from 'istanbul-reports';
import v8ToIstanbul from 'v8-to-istanbul';
import { type EncodedSourceMap } from '@jridgewell/trace-mapping';
import { isMatch } from 'matcher';
import { componentAnnotation, v8CoverageAttachmentName } from './constants.js';

interface Options {
  exclude: string[];
  include: string[];
  outputDir: string;
  reporters: (
    | ['html']
    | ['html', HtmlOptions]
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
  onBegin() {
    this.#sourceCodes.clear();
    this.#sourceMaps.clear();
    this.#v8Coverage = { result: [] };
  }

  async onEnd(result: FullResult) {
    if (result.status === 'interrupted') {
      return;
    }

    const coverageMap = await this.#convertV8ToIstanbul();

    const context = createContext({
      coverageMap,
      dir: path.resolve(process.cwd(), this.#options.outputDir),
      // Istanbul uses tuples for thresholds ("watermarks"). The first number is the
      // failure level. The second is the success level. In between is the warning level.
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
      sourceFinder(path) {
        try {
          return readFileSync(path, 'utf8');
        } catch {
          throw new Error(`Failed to read ${path}.`);
        }
      },
    });

    if (!process.env.isCI) {
      /* eslint-disable no-console */
      console.log('\n');
      console.log('Full coverage report available at: http://localhost:8080');
    }

    for (const [name, options] of this.#options.reporters) {
      if (['text', 'text-summary'].includes(name)) {
        // Both "text" and "text-summary" are logged to the console. So we put some
        // vertical space between them to make the output look a little nicer.
        console.log('\n');
      }

      create(name, options).execute(context);
    }

    const { branches, lines, functions, statements } =
      coverageMap.getCoverageSummary();

    if (
      branches.pct < this.#options.thresholds.branches ||
      lines.pct < this.#options.thresholds.lines ||
      functions.pct < this.#options.thresholds.functions ||
      statements.pct < this.#options.thresholds.statements
    ) {
      result.status = 'failed';
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const isComponentTest = test.annotations.some(({ type }) => {
      return type === componentAnnotation.type;
    });

    if (!isComponentTest) {
      return;
    }

    const coverageAttachment = result.attachments.find(
      ({ name }) => name === v8CoverageAttachmentName,
    );

    if (coverageAttachment?.path) {
      this.#addV8Coverage(coverageAttachment.path);
    }
  }

  constructor(options: Options) {
    this.#options = options;
  }

  #options: Options;

  #sourceCodes = new Map<string, string>();

  #sourceMaps = new Map<string, EncodedSourceMap>();

  #v8Coverage: V8Coverage = { result: [] };

  #addV8Coverage(path: string) {
    const v8Coverage = JSON.parse(
      readFileSync(path, {
        encoding: 'utf8',
      }),
    ) as V8Coverage;

    for (const script of v8Coverage.result) {
      const sourceMap = convertSourceMap.fromSource(script.source);

      if (sourceMap !== null) {
        this.#sourceMaps.set(
          script.url,
          sourceMap.sourcemap as EncodedSourceMap,
        );

        this.#sourceCodes.set(script.url, script.source);
      }
    }

    this.#v8Coverage = {
      result: [...this.#v8Coverage.result, ...v8Coverage.result],
    };
  }

  async #convertV8ToIstanbul() {
    const coverageMap = istanbulLibCoverage.createCoverageMap({});

    for (const script of this.#v8Coverage.result) {
      const sourceCode = this.#sourceCodes.get(script.url);
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
          (pathname) => {
            const include = isMatch(
              path.relative(process.cwd(), pathname),
              this.#options.include,
            );

            const exclude = isMatch(
              path.relative(process.cwd(), pathname),
              this.#options.exclude,
            );

            return !include || exclude;
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
