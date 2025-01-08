import type { BrowserCommand } from 'vitest/node';
import type { Plugin } from 'vitest/config';

const emulateMedia: BrowserCommand<
  [
    argument: {
      colorScheme?: null | 'light' | 'dark' | 'no-preference';
      forcedColors?: null | 'active' | 'none';
      media?: null | 'screen' | 'print';
      reducedMotion?: null | 'reduce' | 'no-preference';
    },
  ]
> = (context, argument) => {
  return context.page.emulateMedia(argument);
};

export default function BrowserCommands(): Plugin {
  return {
    name: 'vitest:custom-commands',
    config() {
      return {
        test: {
          browser: {
            name: 'chromium',
            commands: {
              emulateMedia,
            },
          },
        },
      };
    },
  };
}
