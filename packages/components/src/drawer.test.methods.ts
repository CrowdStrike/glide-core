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
    ?.querySelector('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.true;

  drawer.close();

  drawer.shadowRoot
    ?.querySelector('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.false;
});

it('remains open if "open()" is called an additional time after it is already opened', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.true;

  drawer.open();

  await elementUpdated(drawer);

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.true;
});
