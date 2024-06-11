import './tooltip.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsTooltip from './tooltip.js';
import sinon from 'sinon';

CsTooltip.shadowRootOptions.mode = 'open';

it('is visible on "focusin"', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-labelledby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.true;
});

it('is hidden on "blur"', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
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
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
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
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.true;
});

it('is hidden on "mouseout"', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  component.shadowRoot
    ?.querySelector('.component')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  clock.tick(300);

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;

  clock.restore();
});
