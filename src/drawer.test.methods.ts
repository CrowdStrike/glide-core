/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('opens the drawer via the "show()" method and closes it via "close()"', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  component.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(component.shadowRoot?.querySelector('aside[data-test-state="open"]'))
    .to.be.not.null;

  component.close();

  component.shadowRoot
    ?.querySelector('aside')
    ?.dispatchEvent(new TransitionEvent('transitionend'));

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('aside[data-test-state="closed"]'))
    .to.be.not.null;
});

it('remains open if "show()" is called an additional time after it is already opened', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('aside[data-test-state="open"]'))
    .to.be.not.null;

  component.show();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('aside[data-test-state="open"]'))
    .to.be.not.null;
});
