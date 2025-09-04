import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import { click } from './library/mouse.js';
import Popover from './popover.js';
import requestIdleCallback from './library/request-idle-callback.js';
import './popover.container.js';

it('opens when opened programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.open = true;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('opens when open and enabled programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open disabled>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.disabled = false;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('closes when open and disabled programmatically', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  host.disabled = true;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');

  expect(popover?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('does not open when opened programmatically and disabled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover disabled>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.open = true;

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');

  expect(popover?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('closes on Escape', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');

  expect(popover?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('opens on click', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await click(host.querySelector('button'));

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('opens on Enter', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('opens on Space', async () => {
  const host = await fixture(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  await requestIdleCallback(); // Wait for Floating UI

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('remains open when its popover is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('remains open when its arrow is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('remains closed on click when disabled', async () => {
  const host = await fixture(
    html`<glide-core-popover disabled>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await click(host.querySelector('button'));

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  const target = host.querySelector('button');

  expect(popover?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('remains open when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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

  const container = host.querySelector('glide-core-popover-container');

  expect(host.open).to.be.true;
  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('remains closed when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('closes when something outside of it is clicked', async () => {
  const host = await fixture(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(document.body);

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  const target = host.querySelector('button');

  expect(popover?.checkVisibility()).to.not.be.ok;
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('does not close when a slotted `<label>` is clicked', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>

      <glide-core-popover-container>
        <label for="input">Label</label>
        <input id="input" />
      </glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const label = host.querySelector('label');
  await click(label);

  const popover = host.shadowRoot?.querySelector('[data-test="popover"]');
  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  expect(host.open).to.be.true;
  expect(popover?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('sets `aria-haspopup` on its target when role of its container changes', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-popover-container');

  assert(container);
  container.role = 'dialog';

  expect(target?.ariaHasPopup).to.equal('dialog');
});

it('has `this.#cleanUpFloatingUi?.()` coverage', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
});

it('has `#show()` coverage', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover placement="right">
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  host.open = true;
  host.open = false;
  host.open = true;
});
