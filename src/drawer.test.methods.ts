/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';
import sinon from 'sinon';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('opens the drawer via the "show()" method and closes it via "close()"', async () => {
  const stub = sinon.stub(console, 'error');

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="open"]')).to.be.not
    .null;

  component.close();

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="closed"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises);

  expect(component.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;

  stub.restore();
});

it('remains open if "show()" is called an additional time after it is already opened', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="open"]')).to.be.not
    .null;

  component.show();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="open"]')).to.be.not
    .null;
});
