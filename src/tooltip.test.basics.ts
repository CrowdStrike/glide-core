/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tooltip.js';
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

it('can be open', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip aria-label="Label" open>
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

it('can have a tooltip', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip aria-label="Label">
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot:not([name])')
    ?.assignedNodes()
    .at(0);

  expect(tooltip?.textContent?.trim()).to.equal('Tooltip');
});

it('can have a target', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});

it('does not open when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip aria-label="Label" open disabled>
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
    await fixture<GlideCoreTooltip>(
      html`<glide-core-tooltip></glide-core-tooltip>`,
    );
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
    await fixture<GlideCoreTooltip>(
      html`<glide-core-tooltip> Tooltip </glide-core-tooltip>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
