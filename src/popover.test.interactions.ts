import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import { click } from './library/mouse.js';
import Popover from './popover.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('opens when opened programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('opens when open and enabled programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.disabled = false;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.true;
});

it('closes when open and disabled programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  host.disabled = true;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(popover?.checkVisibility()).to.be.false;
});

it('does not open when opened programmatically and disabled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

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

it('remains open when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const target = host.querySelector('button');

  target?.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
  });

  await requestIdleCallback(); // Wait for Floating UI
  await click(target);

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(host.open).to.be.true;
  expect(popover?.checkVisibility()).to.be.true;
});

it('remains closed when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const target = host.querySelector('button');

  target?.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
  });

  await click(target);
  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  expect(host.open).to.be.false;
  expect(popover?.checkVisibility()).to.be.false;
});

it('closes when something outside of it is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  await click(document.body);

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  assert(popover);

  expect(popover.checkVisibility()).to.not.be.ok;
});

it('does not close when a slotted `<label>` is clicked', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <label for="input">Label</label>
      <input id="input" />

      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const label = host.querySelector('label');
  await click(label);

  expect(host.open).to.be.true;
});

it('has `this.#cleanUpFloatingUi?.()` coverage', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  await requestIdleCallback(); // Wait for Floating UI
  host.open = true;

  await requestIdleCallback(); // Wait for Floating UI
  host.open = true;
});

it('has `set offset(offset: number)` coverage', async () => {
  const host = await fixture<Popover>(
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

  await requestIdleCallback(); // Wait for Floating UI
});

it('has `#show()` coverage', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover placement="right">
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  host.open = true;
  host.open = false;
  host.open = true;
});
