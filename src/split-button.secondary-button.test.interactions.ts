import './option.js';
import { expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import SplitButtonSecondaryButton from './split-button.secondary-button.js';

it('sets `menuOpen` when its menu is opened', async () => {
  const host = await fixture<SplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-option label="Label"></glide-core-option>
    </glide-core-split-button-secondary-button>
  `);

  await click(host.shadowRoot?.querySelector('[data-test="button"]'));

  expect(host.menuOpen).to.be.true;
});

it('sets `menuOpen` when its menu is closed', async () => {
  const host = await fixture<SplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-option label="Label"></glide-core-option>
    </glide-core-split-button-secondary-button>
  `);

  await click(host.shadowRoot?.querySelector('[data-test="button"]'));
  await click(document.body);

  expect(host.menuOpen).to.be.false;
});
