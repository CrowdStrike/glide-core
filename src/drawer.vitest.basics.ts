/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, test } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import GlideCoreDrawer from './drawer.js';
import sinon from 'sinon';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

test('registers itself', () => {
  expect(window.customElements.get('glide-core-drawer')).to.equal(
    GlideCoreDrawer,
  );
});

test('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  await expect(component).to.be.accessible();
});

test('opens', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

test('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-drawer></glide-core-drawer>`);
  } catch {
    spy();
  }

  expect(spy.called).to.be.true;
});
