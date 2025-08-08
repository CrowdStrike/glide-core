import { type CoverageMap } from 'istanbul-lib-coverage';
import { thresholds } from './configuration.js';

export default (coverageMap: CoverageMap) => {
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
};
