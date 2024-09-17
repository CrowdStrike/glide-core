/* eslint-disable @typescript-eslint/no-unused-expressions */

import './icon-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';

GlideCoreIconButton.shadowRootOptions.mode = 'open';

const icon = html`<svg
  width="16"
  height="16"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="M16.51 9.873l-4.459 4.31-4.458-4.31"></path>
</svg>`;

it('focuses its button when `focus()` is called', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="test-icon-button"
      >${icon}</glide-core-icon-button
    >`,
  );

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});
