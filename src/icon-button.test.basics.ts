/* eslint-disable @typescript-eslint/no-unused-expressions */

import './icon-button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';
import sinon from 'sinon';

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

it('registers', async () => {
  expect(window.customElements.get('glide-core-icon-button')).to.equal(
    GlideCoreIconButton,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      ${icon}
    </glide-core-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      ${icon}
    </glide-core-icon-button>`,
  );

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="button"]',
  );

  expect(component.ariaControls).to.equal(null);
  expect(component.ariaExpanded).to.equal(null);
  expect(component.ariaHasPopup).to.equal(null);
  expect(component.disabled).to.equal(false);
  expect(component.variant).to.equal('primary');

  expect(button?.getAttribute('aria-controls')).to.equal(null);
  expect(button?.ariaExpanded).to.equal(null);
  expect(button?.ariaHasPopup).to.equal(null);
  expect(button?.disabled).to.equal(false);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreIconButton>(
      html`<glide-core-icon-button label="Label"></glide-core-icon-button>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
