/* eslint-disable @typescript-eslint/no-unused-expressions */

import './split-button-container.button.js';
import './split-button-container.link.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreSplitButtonContainer from './split-button-container.js';

GlideCoreSplitButtonContainer.shadowRootOptions.mode = 'open';
GlideCoreMenuButton.shadowRootOptions.mode = 'open';

it('focuses the "primary-action" button', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.focus();

  const button = component.querySelector(
    'glide-core-split-button-container-button',
  );

  expect(button).to.have.focus;
});

it('focuses the menu button', async () => {
  const component = await fixture<GlideCoreSplitButtonContainer>(html`
    <glide-core-split-button-container menu-label="Label">
      <glide-core-split-button-container-button
        label="Label"
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `);

  component.focus({
    target: 'menu-button',
  });

  const button = component.shadowRoot?.querySelector(
    '[data-test="menu-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.equal(button);
});
