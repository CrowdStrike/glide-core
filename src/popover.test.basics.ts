/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCorePopover from './popover.js';
import sinon from 'sinon';

GlideCorePopover.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-popover')).to.equal(
    GlideCorePopover,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await expect(component).to.be.accessible();
});

it('opens', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(popover?.checkVisibility()).to.be.true;
});

it('is not open when disabled', async () => {
  const component = await fixture(
    html`<glide-core-popover open disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(popover?.checkVisibility()).to.be.false;
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-popover></glide-core-popover>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if it does not have a "target" slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-popover>Popover</glide-core-popover>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
