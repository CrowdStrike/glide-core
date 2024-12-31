/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTooltip from './tooltip.js';
import hover from './library/hover.js';

GlideCoreTooltip.shadowRootOptions.mode = 'open';

it('is open when opened programmatically', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('is open when `open` and enabled programmatically', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip open disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('is not open when `open` and disabled programmatically', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip open>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.disabled = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('is not open when opened programmatically and disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('is visible on "focusin"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="target-slot"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.true;
});

it('remains closed on "focusin" when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="target-slot"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('closes on "blur"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip open>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.shadowRoot
    ?.querySelector('[data-test="target-slot"]')
    ?.dispatchEvent(new FocusEvent('focusout'));

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('closes on Escape', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip open>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('span')?.focus();
  await sendKeys({ press: 'Escape' });

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('opens on hover', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.shadowRoot?.querySelector('[data-test="component"'));

  expect(tooltip.checkVisibility()).to.be.true;
});

it('remains closed on hover when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.shadowRoot?.querySelector('[data-test="component"'));

  expect(tooltip.checkVisibility()).to.be.false;
});

it('closes when hovered away from', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.shadowRoot?.querySelector('[data-test="component"'));

  tooltip.dataset.closeDelay = '0';

  await hover(
    component.shadowRoot?.querySelector('[data-test="component"'),
    'outside',
  );

  expect(tooltip.checkVisibility()).to.be.false;
});

it('remains closed if hovered away from before the delay', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '5';
  tooltip.dataset.closeDelay = '0';

  await hover(component.shadowRoot?.querySelector('[data-test="component"'));

  expect(tooltip?.checkVisibility()).to.be.false;

  await hover(
    component.shadowRoot?.querySelector('[data-test="component"'),
    'outside',
  );

  expect(tooltip.checkVisibility()).to.be.false;
});

it('has `middlewareData.arrow.y` coverage', async () => {
  await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      placement="right"
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
      open
    >
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);
});
