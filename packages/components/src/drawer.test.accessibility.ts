import './drawer.js';
import { expect, fixture, html } from '@open-wc/testing';
import Drawer from './drawer.js';

Drawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('is accessible', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.shadowRoot
    ?.querySelector('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  drawer.open();

  await expect(drawer).to.be.accessible();
});

it('focuses the aside upon opening', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  drawer.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(drawer.shadowRoot?.activeElement).to.equal(
    drawer.shadowRoot?.querySelector('aside'),
  );
});
