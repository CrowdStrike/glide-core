/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('closes when the "Escape" key is pressed', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  // await elementUpdated(component);

  await sendKeys({ press: 'Escape' });

  // // Wait for it to open.
  await aTimeout(0);

  expect(
    component?.shadowRoot?.querySelector('aside[data-test-state="closed"]'),
  ).to.be.not.null;
});

it('does not close when a key other than "Escape" is pressed', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  component.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(component);

  component.shadowRoot?.querySelector('aside')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component?.shadowRoot?.querySelector('aside[data-test-state="open"]'))
    .to.be.not.null;
});
