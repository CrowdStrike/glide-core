import { elementUpdated, fixture, html } from '@open-wc/testing-helpers';
import { expect, test } from 'vitest';
import { server } from '@vitest/browser/context';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

test('focuses itself on open', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;
  await elementUpdated(component);

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="component"]'),
  );
});
