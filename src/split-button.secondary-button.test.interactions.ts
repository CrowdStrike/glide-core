/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.button.js';
import './menu.options.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

GlideCoreSplitButtonSecondaryButton.shadowRootOptions.mode = 'open';

it('sets `menuOpen` when its menu is opened', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  component.click();

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(component.menuOpen).to.be.true;
});

it('sets `menuOpen` when its menu is closed', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label" menu-open>
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  // Wait for Menu to open.
  await aTimeout(0);

  document.body.click();

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(component.menuOpen).to.be.false;
});
