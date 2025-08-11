import path from 'node:path';
import { type ReportNode, type Context } from 'istanbul-lib-report';
import { create, type LinkMapper } from 'istanbul-reports';
import { coverageReporterOutputDirectory, reporters } from './configuration.js';

export default (context: Context) => {
  for (const [name, options] of reporters) {
    if (['text', 'text-summary'].includes(name)) {
      // Both "text" and "text-summary" are logged to the console. So we put some
      // vertical space between them to make the output look a little nicer.
      //
      // eslint-disable-next-line no-console
      console.log('\n');
    }

    if (name === 'html') {
      // eslint-disable-next-line no-console
      console.log(`- Writing "html" report to ${context.dir}`);

      create(name, {
        ...options,
        // Unchanged from the default implementation¹ except for the addition of
        // `coverageReporterOutputDirectory` to the `relativePath()` method.
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
                  `${coverageReporterOutputDirectory}/${targetPath}`,
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
};
