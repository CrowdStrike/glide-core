import './drawer.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import Drawer from './drawer.js';

Drawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('opens the Drawer via the "open()" method and closes it via "close()"', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  await elementUpdated(drawer);

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(drawer.shadowRoot?.querySelector('aside[data-test="open"]')).to.be.not
    .null;

  drawer.close();

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('aside[data-test="closed"]')).to.be
    .not.null;
});

it('remains open if "open()" is called an additional time after it is already opened', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('aside[data-test="open"]')).to.be.not
    .null;

  drawer.open();

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('aside[data-test="open"]')).to.be.not
    .null;
});
