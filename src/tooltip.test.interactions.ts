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
import Tooltip from './tooltip.js';
import TooltipContainer from './tooltip.container.js';

it('passes down certain properties to its container', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" description="Description">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await waitUntil(() => {
    return host.querySelector<TooltipContainer>(
      'glide-core-private-tooltip-container',
    );
  });

  host.label = 'Label';
  host.description = 'Description';
  host.screenreaderHidden = true;
  host.shortcut = ['CMD', 'O'];

  const container = host.querySelector<TooltipContainer>(
    'glide-core-private-tooltip-container',
  );

  expect(container?.label).to.equal('Label');
  expect(container?.screenreaderHidden).to.be.true;
  expect(container?.shortcut).to.deep.equal(['CMD', 'O']);
});

it('is open when opened programmatically', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.open = true;
  await aTimeout(0); // Wait for Floating UI.

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('is open when open and enabled programmatically', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" open disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.disabled = false;
  await aTimeout(0); // Wait for Floating UI

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('is not open when open and disabled programmatically', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await aTimeout(0); // Wait for Floating UI
  host.disabled = true;
  await aTimeout(0); // Wait for Floating UI

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('is not open when opened programmatically and disabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.open = true;
  await aTimeout(0); // Wait for Floating UI

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('opens when tabbed to', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await sendKeys({ press: 'Tab' });
  await aTimeout(0); // Wait for Floating UI

  expect(
    host.shadowRoot?.querySelector('[data-test="tooltip"]')?.checkVisibility(),
  ).to.be.true;
});

it('opens on hover', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);
  tooltip.dataset.openDelay = '0';

  await hover(target);
  await aTimeout(0); // Wait for Floating UI and `#onComponentMouseOver()`

  expect(tooltip.checkVisibility()).to.be.true;
});

it('remains open when hovered away from and the event is canceled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.addEventListener('mouseout', (event: MouseEvent) => {
    event.preventDefault();
  });

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  tooltip.dataset.closeDelay = '0';

  await hover(target);
  await aTimeout(0); // Wait for Floating UI and `#onComponentMouseOver()`

  await hover(document.body);
  await aTimeout(0); // Wait for `#onComponentMouseOut()`

  expect(tooltip.checkVisibility()).to.be.true;
});

it('remains closed on hover when disabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);
  tooltip.dataset.openDelay = '0';

  await hover(target);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('closes on Escape', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  expect(
    host.shadowRoot?.querySelector('[data-test="tooltip"]')?.checkVisibility(),
  ).to.be.false;
});

it('closes when hovered away from', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  tooltip.dataset.closeDelay = '0';

  await hover(target);
  await aTimeout(0); // Wait for Floating UI and `#onComponentMouseOver()`

  await hover(document.body);
  await aTimeout(0); // Wait for `#onComponentMouseOut()`

  expect(tooltip.checkVisibility()).to.be.false;
});

it('remains closed if hovered away from before its delay', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '5';
  tooltip.dataset.closeDelay = '0';

  // The assertions below intermittently fail with `hover()`. Seems to be a bug either
  // in Web Test Runner or Playwright related to concurrency. Both assertions consistently
  // pass when concurrency is disabled.
  //
  // https://github.com/modernweb-dev/web/issues/2374
  target?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(tooltip?.checkVisibility()).to.be.false;

  target?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));

  await aTimeout(5);

  expect(tooltip.checkVisibility()).to.be.false;
});

it('remains closed when hovered to and the event is canceled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.addEventListener('mouseover', (event: MouseEvent) => {
    event.preventDefault();
  });

  const target = host.querySelector('button');

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  assert(tooltip);

  tooltip.dataset.openDelay = '0';
  tooltip.dataset.closeDelay = '0';

  await hover(target);
  await aTimeout(0); // Wait for Floating UI and `#onComponentMouseOver()`

  expect(tooltip.checkVisibility()).to.be.false;
});

it('sets `aria-describedby` on its target when enabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.disabled = false;

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-private-tooltip-container');

  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when disabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.disabled = true;

  const target = host.querySelector('button');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('sets `aria-describedby` on its target when hidden from screenreaders', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.screenreaderHidden = true;

  const target = host.querySelector('button');
  expect(target?.getAttribute('aria-describedby')).to.be.null;
});

it('sets `aria-describedby` on its target when not hidden from screenreaders', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" screenreader-hidden>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.screenreaderHidden = false;

  const target = host.querySelector('button');
  const container = host.querySelector('glide-core-private-tooltip-container');

  expect(target?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('has `middlewareData.arrow.y` coverage', async () => {
  await fixture<Tooltip>(
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

  await aTimeout(0); // Wait for Floating UI
});

it('has `set open(isOpen: boolean)` coverage', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip
      label="Label"
      placement="right"
      style="align-items: center; display: flex; height: 100vh; justify-content:center; width: 100vw;"
      open
    >
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  host.open = true;
  host.open = false;
  host.open = true;
});
