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

it('closes when the "Escape" key is pressed', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  drawer.shadowRoot
    ?.querySelector<HTMLDialogElement>('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  await sendKeys({ press: 'Escape' });

  setTimeout(() => {
    drawer.shadowRoot
      ?.querySelector<HTMLDialogElement>('dialog')
      ?.dispatchEvent(new TransitionEvent('transitionend'));
  });

  await oneEvent(drawer, 'close');

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.false;
});

it('does not close when a key other than "Escape" is pressed', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  drawer.shadowRoot
    ?.querySelector<HTMLDialogElement>('dialog')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(drawer);

  drawer.shadowRoot?.querySelector('dialog')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(drawer.shadowRoot?.querySelector('dialog')?.open).to.be.true;
});
