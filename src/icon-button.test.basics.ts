/* eslint-disable @typescript-eslint/no-unused-expressions */

import './icon-button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';
import sinon from 'sinon';

GlideCoreIconButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(globalThis.customElements.get('glide-core-icon-button')).to.equal(
    GlideCoreIconButton,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="button"]',
  );

  expect(component.ariaControls).to.equal(null);
  expect(component.ariaExpanded).to.equal(null);
  expect(component.ariaHasPopup).to.equal(null);
  expect(component.disabled).to.be.false;
  expect(component.variant).to.equal('primary');

  expect(button?.getAttribute('aria-controls')).to.equal(null);
  expect(button?.ariaExpanded).to.equal(null);
  expect(button?.ariaHasPopup).to.equal(null);
  expect(button?.disabled).to.be.false;
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
