/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import GlideCorePopover from './popover.js';

GlideCorePopover.shadowRootOptions.mode = 'open';

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens when `open` and enabled programmatically', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('closes when `open` and disabled programmatically', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.disabled = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('does not open when opened programmatically and disabled', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('closes on Escape', async () => {
  const component = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="popover"]')
      ?.checkVisibility(),
  ).to.be.false;
});

it('opens on click', async () => {
  const component = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await click(component.querySelector('button'));

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens on Enter', async () => {
  const component = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens on Space', async () => {
  const component = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('remains open when its popover is clicked', async () => {
  const component = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = component.shadowRoot?.querySelector('[data-test="popover"]');
  const defaultSlot = component.shadowRoot?.querySelector('slot:not([name])');

  // The assertion below intermittently fails with `click()`. Seems to be
  // a bug either in Web Test Runner or Playwright related to concurrency.
  // It consistently passes when concurrency is disabled.
  //
  // https://github.com/modernweb-dev/web/issues/2374
  defaultSlot?.dispatchEvent(new PointerEvent('mouseup', { bubbles: true }));
  defaultSlot?.dispatchEvent(new PointerEvent('click', { bubbles: true }));

  expect(popover?.checkVisibility()).to.be.true;
});

it('remains open when its arrow is clicked', async () => {
  const component = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const arrow = component.shadowRoot?.querySelector('[data-test="arrow"]');

  // The assertion below intermittently fails with `click()`. Seems to be
  // a bug either in Web Test Runner or Playwright related to concurrency.
  // It consistently passes when concurrency is disabled.
  //
  // https://github.com/modernweb-dev/web/issues/2374
  arrow?.dispatchEvent(new PointerEvent('mouseup', { bubbles: true }));
  arrow?.dispatchEvent(new PointerEvent('click', { bubbles: true }));

  expect(arrow?.checkVisibility()).to.be.true;
});

it('remains closed on click when disabled', async () => {
  const component = await fixture(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await click(component.querySelector('button'));

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(document.body);

  const popover = component.shadowRoot?.querySelector('[data-test="popover"]');
  assert(popover);

  expect(popover.checkVisibility()).to.not.be.ok;
});

it('has `this.#cleanUpFloatingUi?.()` coverage', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  // Wait for Floating UI.
  await aTimeout(0);
  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);
  component.open = true;
});

it('has `set offset(offset: number)` coverage', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.offset = 0;
});

it('has `middlewareData.arrow.y` coverage', async () => {
  await fixture(
    html`<glide-core-popover
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
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);
});

it('has `#show()` coverage', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover placement="right">
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.open = true;
  component.open = false;
  component.open = true;
});
