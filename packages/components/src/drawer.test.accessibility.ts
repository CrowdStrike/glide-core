import './drawer.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('is accessible', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.shadowRoot
    ?.querySelector<HTMLDialogElement>('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  drawer.open();

  await expect(drawer).to.be.accessible();
});

it('focuses the dialog upon opening', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  drawer.shadowRoot
    ?.querySelector<HTMLDialogElement>('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(drawer.shadowRoot?.activeElement).to.equal(
    drawer.shadowRoot?.querySelector('dialog'),
  );
});
