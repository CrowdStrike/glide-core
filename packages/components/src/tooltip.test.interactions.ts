import './tooltip.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsTooltip from './tooltip.js';

CsTooltip.shadowRootOptions.mode = 'open';

it('is visible on "focusin"', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
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
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusout'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;
});

it.skip('is hidden on Escape', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new FocusEvent('focusin'));

  await elementUpdated(component);

  // So the key is sent to the component instead of `<body>`.
  component.focus();
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
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.true;
});

it('is hidden on "mouseout"', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new MouseEvent('mouseover'));

  await elementUpdated(component);

  component.shadowRoot
    ?.querySelector('[aria-describedby="tooltip"]')
    ?.dispatchEvent(new MouseEvent('mouseout'));

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[role="tooltip"]')?.checkVisibility(),
  ).to.be.false;
});
