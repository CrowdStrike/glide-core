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

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('dispatches a "close" event when the "Escape" key is pressed', async () => {
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

  const event = await oneEvent(component, 'close');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "close" event when closed via the "close" method', async () => {
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

  const closeEvent = oneEvent(component, 'close');

  component.close();

  const event = await closeEvent;
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "close" event when the "open" attribute is removed', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  const closeEvent = oneEvent(component, 'close');

  component.removeAttribute('open');

  await elementUpdated(component);

  const event = await closeEvent;
  expect(event instanceof Event).to.be.true;
});
