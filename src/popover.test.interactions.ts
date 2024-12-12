/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCorePopover from './popover.js';

GlideCorePopover.shadowRootOptions.mode = 'open';

afterEach(async () => {
  await resetMouse();
});

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

  const target = component.querySelector('button');
  assert(target);

  const { height, width, x, y } = target.getBoundingClientRect();

  // `sendMouse` so the "mouseup" handler in `firstUpdated()` also
  // gets coverage.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x + width / 2), Math.ceil(y + height / 2)],
  });

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

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  assert(popover);

  const { height, width, x, y } = popover.getBoundingClientRect();

  // `sendMouse` so the "mouseup" handler in `firstUpdated()` can do its thing.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x + width / 2), Math.ceil(y + height / 2)],
  });

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

  const arrow = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="arrow"]',
  );

  assert(arrow);

  const { height, width, x, y } = arrow.getBoundingClientRect();

  // `sendMouse` so the "mouseup" handler in `firstUpdated()` can do its thing.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x + width / 2), Math.ceil(y + height / 2)],
  });

  expect(arrow?.checkVisibility()).to.be.true;
});

it('remains closed on click when disabled', async () => {
  const component = await fixture(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  component.querySelector('button')?.click();

  // Wait for Floating UI.
  await aTimeout(0);

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

  document.body.click();

  const popover = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

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
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
      open
    >
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);
});
