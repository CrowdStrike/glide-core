import './menu.button.js';
import './menu.options.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import SplitButtonSecondaryButton from './split-button.secondary-button.js';

it('sets `menuOpen` when its menu is opened', async () => {
  const host = await fixture<SplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  await click(host);

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(host.menuOpen).to.be.true;
});

it('sets `menuOpen` when its menu is closed', async () => {
  const host = await fixture<SplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label" menu-open>
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  // Wait for Menu to open.
  await aTimeout(0);

  await click(document.body);

  // Wait for the Mutation Observer to pick up the attribute change.
  await aTimeout(0);

  expect(host.menuOpen).to.be.false;
});
