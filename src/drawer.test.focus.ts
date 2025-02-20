import { expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';

it('focuses itself on open', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
  );

  host.open = true;
  await host.updateComplete;

  expect(host.shadowRoot?.activeElement).to.equal(
    host.shadowRoot?.querySelector('[data-test="component"]'),
  );
});
