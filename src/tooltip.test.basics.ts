/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTooltip from './tooltip.js';
import sinon from 'sinon';

GlideCoreTooltip.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-tooltip')).to.equal(
    GlideCoreTooltip,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // See the comment in the component's `render` method for an explanation.
  await expect(component).to.be.accessible({
    ignoredRules: ['aria-tooltip-name'],
  });
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(component.offset).to.equal(4);
  expect(component.open).to.be.false;
  expect(component.placement).to.be.be.undefined;
  expect(component.disabled).to.be.false;
  expect(component.shortcut).to.be.deep.equal([]);
  expect(tooltip?.checkVisibility()).to.be.false;
});

it('can be open', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip open>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('can have a single-key shortcut', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip .shortcut=${['Enter']}>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const shortcut = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.trim()).to.equal('Enter');
});

it('can have a multi-key shortcut', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip .shortcut=${['CMD', 'K']}>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const shortcut = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.replaceAll(/\s/g, '')).to.equal('CMD+K');
});

it('is not open when disabled', async () => {
  const component = await fixture(
    html`<glide-core-tooltip open disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tooltip></glide-core-tooltip>`);
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
    await fixture(html`<glide-core-tooltip>Tooltip</glide-core-tooltip>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('has `placement` coverage', async () => {
  await fixture(
    html`<glide-core-tooltip open placement="top">
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );
});
