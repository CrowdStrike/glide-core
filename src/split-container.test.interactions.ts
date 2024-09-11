/* eslint-disable @typescript-eslint/no-unused-expressions */
import './split-container.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitContainer from './split-container.js';

GlideCoreSplitContainer.shadowRootOptions.mode = 'open';

it('the menu opens when the menu button is clicked', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="primary-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.not.have.attribute('open');

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="split-menu-button"]')
    ?.click();

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-menu')
      ?.hasAttribute('open'),
  ).to.be.true;
});
