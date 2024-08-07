/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('dispatches an "open" event when opened via the "open" method', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  const openEvent = oneEvent(drawer, 'open');

  drawer.open();

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  const event = await openEvent;
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "close" event when the "Escape" key is pressed', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  const closeEvent = oneEvent(drawer, 'close');

  drawer.open();

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  await sendKeys({ press: 'Escape' });

  setTimeout(() => {
    drawer.shadowRoot
      ?.querySelector('aside')
      ?.dispatchEvent(new TransitionEvent('transitionend'));
  });

  const event = await closeEvent;
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "close" event when closed via the "close" method', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  const closeEvent = oneEvent(drawer, 'close');

  drawer.open();

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  drawer.close();

  setTimeout(() => {
    drawer.shadowRoot
      ?.querySelector('aside')
      ?.dispatchEvent(new TransitionEvent('transitionend'));
  });

  const event = await closeEvent;
  expect(event instanceof Event).to.be.true;
});
