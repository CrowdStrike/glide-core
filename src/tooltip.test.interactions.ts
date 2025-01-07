/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { hover } from './library/mouse.js';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import GlideCoreTooltip from './tooltip.js';

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
  await hover(component.querySelector('span'));

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
  await hover(component.querySelector('span'));

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
  await hover(component.querySelector('span'));

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

  // The assertions below intermittently fail with `hover()`. Seems to be
  // a bug either in Web Test Runner or Playwright related to concurrency.
  // Both consistently pass when concurrency is disabled.
  //
  // https://github.com/modernweb-dev/web/issues/2374
  component
    ?.querySelector('span')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(tooltip?.checkVisibility()).to.be.false;

  component
    ?.querySelector('span')
    ?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));

  await aTimeout(5);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('has `middlewareData.arrow.y` coverage', async () => {
  await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      placement="right"
      style=${styleMap({
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100vw',
      })}
      open
    >
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);
});

it('has `set open(isOpen: boolean)` coverage', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      placement="right"
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
      open
    >
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.open = true;
  component.open = false;
  component.open = true;
});
