import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import { click } from './library/mouse.js';
import GlideCorePopover from './popover.js';

it('opens when opened programmatically', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens when open and enabled programmatically', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover open disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('closes when open and disabled programmatically', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.disabled = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('does not open when opened programmatically and disabled', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('closes on Escape', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  expect(
    host.shadowRoot?.querySelector('[data-test="popover"]')?.checkVisibility(),
  ).to.be.false;
});

it('opens on click', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await click(host.querySelector('button'));

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens on Enter', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens on Space', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('remains open when its popover is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  const defaultSlot = host.shadowRoot?.querySelector('slot:not([name])');

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
  const host = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const arrow = host.shadowRoot?.querySelector('[data-test="arrow"]');

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
  const host = await fixture(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await click(host.querySelector('button'));

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('closes when something outside of it is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(document.body);

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  assert(popover);

  expect(popover.checkVisibility()).to.not.be.ok;
});

it('does not close when a slotted `<label>` is clicked', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      <label for="input">Label</label>
      <input id="input" />

      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const label = host.querySelector('label');
  await click(label);

  expect(host.open).to.be.true;
});

it('has `this.#cleanUpFloatingUi?.()` coverage', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  // Wait for Floating UI.
  await aTimeout(0);
  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);
  host.open = true;
});

it('has `set offset(offset: number)` coverage', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.offset = 0;
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
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover placement="right">
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;
  host.open = false;
  host.open = true;
});
