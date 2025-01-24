import { expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';

it('focuses itself on open', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;
  await component.updateComplete;

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="component"]'),
  );
});
