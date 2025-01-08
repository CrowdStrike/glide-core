import './src/styles/fonts.css';
import './src/styles/variables.css';
import { afterEach, beforeEach, chai } from 'vitest';
import { chaiA11yAxe } from 'chai-a11y-axe';
import { fixtureCleanup } from '@open-wc/testing-helpers';
import { server } from '@vitest/browser/context';

chai.use(chaiA11yAxe);

beforeEach(async () => {
  // So tests run the same for everyone regardless of whether they've turned
  // on their reduce motion system setting.
  await server.commands.emulateMedia({ reducedMotion: 'no-preference' });
});

afterEach(async () => {
  // Magical. But it's too easy to forget to revert `reducedMotion: 'reduce'`
  // at the end of every test.
  await server.commands.emulateMedia({ reducedMotion: 'no-preference' });

  fixtureCleanup();
});
