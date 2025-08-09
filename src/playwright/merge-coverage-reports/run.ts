import getCoverageReports from './get-coverage-reports.js';
import getCoverage from './get-coverage.js';
import createCoverageReports from './create-coverage-reports.js';
import verifyCoverage from './verify-coverage.js';

const reports = await getCoverageReports();
const coverage = getCoverage(reports);

createCoverageReports(coverage.context);
verifyCoverage(coverage.map);
