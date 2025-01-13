/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-drawer')).to.equal(
    GlideCoreDrawer,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  await expect(component).to.be.accessible();
});

it('opens', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`<glide-core-drawer></glide-core-drawer>`);
  });
});
