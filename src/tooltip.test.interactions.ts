/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tooltip.js';
import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTooltip from './tooltip.js';

GlideCoreTooltip.shadowRootOptions.mode = 'open';

it('is open when opened programmatically', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip aria-label="Label">
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
    html`<glide-core-tooltip aria-label="Label" open disabled>
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
    html`<glide-core-tooltip aria-label="Label" open>
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
    html`<glide-core-tooltip aria-label="Label" disabled>
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
    ?.querySelector('[data-test="target"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.true;
});

it('is hidden on "focusin" when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="target"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('is hidden on "blur"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  const target = component.shadowRoot?.querySelector('[data-test="target"]');
  target?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  target?.dispatchEvent(new FocusEvent('focusout'));

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('is hidden on Escape', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="target"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

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

it('is visible on "mouseover"', async () => {
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

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  // Wait for Floating UI and the open delay.
  await aTimeout(0);

  expect(tooltip.checkVisibility()).to.be.true;
});

it('is hidden on "mouseover" when disabled', async () => {
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

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  // Wait for Floating UI.
  await aTimeout(0);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('is hidden on "mouseout"', async () => {
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

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  // Wait for Floating UI and the open delay.
  await aTimeout(0);

  tooltip.dataset.closeDelay = '0';

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  // Wait for the close delay.
  await aTimeout(0);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('remains hidden if "mouseout" fires before the "mouseover" delay', async () => {
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

  tooltip.dataset.openDelay = '1';
  tooltip.dataset.closeDelay = '0';

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  expect(tooltip?.checkVisibility()).to.be.false;

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  await aTimeout(1);

  expect(tooltip.checkVisibility()).to.be.false;
});

// This would be better served by a visual regression test. It exists only
// to meet our coverage threshold, so the `middlewareData.arrow.y` branch
// is hit.
it('positions the tooltip when `placement="right"`', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      placement="right"
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
    >
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="target"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltipContainer = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  const arrow = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="arrow"]',
  );

  expect(tooltipContainer?.style.left).to.not.be.empty.string;
  expect(tooltipContainer?.style.top).to.not.be.empty.string;
  expect(arrow?.style.left).to.be.empty.string;
  expect(arrow?.style.top).to.not.be.empty.string;
});
