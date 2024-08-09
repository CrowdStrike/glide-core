/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tooltip.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTooltip from './tooltip.js';
import sinon from 'sinon';

GlideCoreTooltip.shadowRootOptions.mode = 'open';

it('is visible on "focusin"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
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
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.not.be.ok;
});

it('is hidden on "blur"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  component.shadowRoot
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusout'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
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
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  // So the key is sent to the component instead of `<body>`. It's not
  // clear why `component.focus()` doesn't focus the span when using
  // Playwright.
  component.querySelector('span')?.focus();

  await sendKeys({ press: 'Escape' });
  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;
});

it('is visible on "mouseover"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  await waitUntil(
    () =>
      component.shadowRoot
        ?.querySelector('[role="tooltip"]')
        ?.checkVisibility(),
  );

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.true;
});

it('is hidden on "mouseover" when disabled', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip disabled>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  // Advance time to get past the tooltip opening delay
  clock.tick(500);

  expect(component.shadowRoot?.querySelector('[role="tooltip"]')).to.be.null;

  clock.restore();
});

it('is hidden on "mouseout"', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  // Advance time to get past the tooltip opening delay
  clock.tick(500);

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  // Advance time to get past the tooltip closing delay
  clock.tick(300);

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;

  clock.restore();
});

it('remains hidden if "mouseout" fires before the "mouseover" delay completes', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </glide-core-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  // We need to be between 0 and the tooltip opening delay
  // so that we can "mouseout" of it before it has a chance
  // to open
  clock.tick(200);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;

  clock.restore();
});
