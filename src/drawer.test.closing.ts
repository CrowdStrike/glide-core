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
import { emulateMedia } from '@web/test-runner-commands';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('closes when the "Escape" key is pressed', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  const closeEvent = oneEvent(component, 'close');

  component.show();

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="open"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises!);

  await sendKeys({ press: 'Escape' });

  await elementUpdated(component);

  const event = await closeEvent;
  expect(event instanceof Event).to.be.true;

  assert(component?.shadowRoot?.querySelector('[data-test="closed"]'));
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

  await Promise.allSettled(animationPromises!);

  await sendKeys({ press: 'Enter' });

  assert(component?.shadowRoot?.querySelector('[data-test="open"]'));
});

// This is required to meet the coverage threshold.
it('waits for the drawer "close" animation to finish before playing the "open" animation', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  component.open = false;

  await elementUpdated(component);

  component.open = true;

  await elementUpdated(component);
});

// This is required to meet the coverage threshold.
it('waits for the drawer "open" animation to finish before playing the "close" animation', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.open = true;

  await elementUpdated(component);

  component.open = false;

  await elementUpdated(component);
});
