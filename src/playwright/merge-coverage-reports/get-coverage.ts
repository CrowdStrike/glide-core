import path from 'node:path';
import istanbulLibCoverage, {
  type CoverageMapData,
} from 'istanbul-lib-coverage';
import { createContext } from 'istanbul-lib-report';
import {
  coverageReporterOutputDirectory,
  playwrightOutputDirectory,
  thresholds,
} from './configuration.js';

export default (coverageMapData: CoverageMapData[]) => {
  const map = istanbulLibCoverage.createCoverageMap({});

  // eslint-disable-next-line  no-console
  console.log('- Merging coverage reports');

  for (const mapData of coverageMapData) {
    map.merge(mapData);
  }

  const context = createContext({
    coverageMap: map,
    // The directory to which Istanbul will write the report.
    dir: path.join(playwrightOutputDirectory, coverageReporterOutputDirectory),

    // Istanbul uses tuples for thresholds ("watermarks"). The first number is the
    // failure level. The second is the success level. In between those two numbers
    // is the warning level.
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

  return {
    context,
    map,
  };
};
