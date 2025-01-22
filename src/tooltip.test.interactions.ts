import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import { hover } from './library/mouse.js';
import GlideCoreTooltip from './tooltip.js';
import GlideCoreTooltipContainer from './tooltip.container.js';

it('passes down certain properties to its container', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="One">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await waitUntil(() => {
    return component.querySelector<GlideCoreTooltipContainer>(
      'glide-core-private-tooltip-container',
    );
  });

  component.label = 'Two';
  component.screenreaderHidden = true;
  component.shortcut = ['CMD', 'O'];

  const container = component.querySelector<GlideCoreTooltipContainer>(
    'glide-core-private-tooltip-container',
  );

  expect(container?.label).to.equal('Two');
  expect(container?.screenreaderHidden).to.be.true;
  expect(container?.shortcut).to.deep.equal(['CMD', 'O']);
});

it('is open when opened programmatically', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
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
    html`<glide-core-tooltip label="Label" open disabled>
      <button slot="target">Target</button>
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
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
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
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
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
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
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

it('remains closed on hover when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await aTimeout(0);
  await hover(component.querySelector('button'));

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('closes on "blur"', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const button = component.querySelector('button');

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(button);
  await aTimeout(0);

  tooltip.dataset.closeDelay = '0';
  await hover(button, 'outside');
  await aTimeout(0);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('closes on Escape', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="tooltip"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('opens on hover', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.querySelector('button'));

  expect(tooltip.checkVisibility()).to.be.true;
});

it('remains closed on hover when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.querySelector('button'));

  expect(tooltip.checkVisibility()).to.be.false;
});

it('closes when hovered away from', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  await hover(component.querySelector('button'));

  tooltip.dataset.closeDelay = '0';

  await hover(
    component.shadowRoot?.querySelector('[data-test="component"'),
    'outside',
  );

  expect(tooltip.checkVisibility()).to.be.false;
});

it('remains closed if hovered away from before the delay', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
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
    ?.querySelector('button')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(tooltip?.checkVisibility()).to.be.false;

  component
    ?.querySelector('button')
    ?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));

  await aTimeout(5);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('sets `aria-describedby` on its target when enabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.disabled = false;

  const button = component.querySelector('button');

  const container = component.querySelector(
    'glide-core-private-tooltip-container',
  );

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.disabled = true;

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.equal(null);
});

it('sets `aria-describedby` on its target when not hidden from screenreaders', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" screenreader-hidden>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.screenreaderHidden = false;

  const button = component.querySelector('button');

  const container = component.querySelector(
    'glide-core-private-tooltip-container',
  );

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('sets `aria-describedby` on its target when hidden from screenreaders', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.screenreaderHidden = true;

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.equal(null);
});

it('sets `aria-describedby` on its target when not hidden from screenreaders', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" screenreader-hidden>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.screenreaderHidden = false;

  const button = component.querySelector('button');

  const container = component.querySelector(
    'glide-core-private-tooltip-container',
  );

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('has `middlewareData.arrow.y` coverage', async () => {
  await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      label="Label"
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
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);
});

it('has `set open(isOpen: boolean)` coverage', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      label="Label"
      placement="right"
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
      open
    >
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  component.open = true;
  component.open = false;
  component.open = true;
});
