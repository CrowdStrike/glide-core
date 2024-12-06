/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';
import sinon from 'sinon';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('closes when the "Escape" key is pressed', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="open"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises);

  setTimeout(() => {
    sendKeys({ press: 'Escape' });
  });

  await elementUpdated(component);

  const event = await oneEvent(component, 'close');
  expect(event instanceof Event).to.be.true;

  expect(component?.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;
});

it('does not close when a key other than "Escape" is pressed', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="open"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises);

  await sendKeys({ press: 'Enter' });

  expect(component?.shadowRoot?.querySelector('[data-test="open"]')).to.not
    .null;
});

it('`open` has coverage', async () => {
  const stub = sinon.stub(console, 'error');

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  component.open = false;

  await elementUpdated(component);

  component.open = true;

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="open"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises);

  stub.restore();
});
