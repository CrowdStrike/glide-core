import { RuleTester } from '@typescript-eslint/rule-tester';
import { prefixedTestComponentImport } from './prefixed-test-component-import.js';

const ruleTester = new RuleTester();

ruleTester.run('prefixed-test-component-import', prefixedTestComponentImport, {
  valid: [
    {
      code: "import GlideCoreComponent from './component.js';",
    },
    {
      code: "import './component.js';",
    },
    // Verify it doesn't complain about non-relative path imports
    {
      code: "import Component from '@crowdstrike/glide-core/component';",
    },
  ],
  invalid: [
    {
      code: `
        import Component from './component.js';

        Component.shadowRootOptions.mode = 'open';

        it('does something', async () => {
          expect(Component).to.be.true;
        });
      `,
      output: `
        import GlideCoreComponent from './component.js';

        GlideCoreComponent.shadowRootOptions.mode = 'open';

        it('does something', async () => {
          expect(GlideCoreComponent).to.be.true;
        });
      `,
      errors: [
        {
          messageId: 'addPrefix',
        },
      ],
    },
  ],
});
