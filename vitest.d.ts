export {};

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    emulateMedia: (argument: {
      colorScheme?: null | 'light' | 'dark' | 'no-preference';
      forcedColors?: null | 'active' | 'none';
      media?: null | 'screen' | 'print';
      reducedMotion?: null | 'reduce' | 'no-preference';
    }) => Promise<void>;
  }
}
