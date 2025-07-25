import './options.js';
import './options.group.js';
import { LitElement } from 'lit';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import requestIdleCallback from './library/request-idle-callback.js';
import { click } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import Tooltip from './tooltip.js';

@customElement('glide-core-menu-in-another-component')
class MenuInAnotherComponent extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  }
}

it('opens on click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Two ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await click(target);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when the edge of its default slot or the edge of its sub-Menu default slot is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(defaultSlots[0], 'left');

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(options[0]?.ariaExpanded).to.equal('true');

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  await requestIdleCallback(); // Wait for Floating UI
  await click(defaultSlots[1], 'left');

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(options[0]?.ariaExpanded).to.equal('true');

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('remains open when its sub-Menus are opened via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                    <glide-core-option label="Four"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Five"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[1]);
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(defaultSlots[0]?.checkVisibility()).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  await click(targets[2]);
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('true');

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('remains open when a disabled Option is clicked via `click()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  options[0]?.click();

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('remains open when a disabled Option is clicked via `sendMouse()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('remains open when an Option is clicked and the event is canceled at the Option', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const option = host.querySelector('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  option?.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  await requestIdleCallback(); // Wait for Floating UI
  await click(option);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);

  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when an Option is clicked and the event is canceled at Options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const option = host.querySelector('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  host
    .querySelector('glide-core-options')
    ?.addEventListener('click', (event: Event) => {
      event.preventDefault();
    });

  await requestIdleCallback(); // Wait for Floating UI
  await click(option);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);

  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when its target is clicked and the event is canceled at its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  target?.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  await requestIdleCallback(); // Wait for Floating UI
  await click(target);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when its target is clicked and the event is canceled at its host', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  await requestIdleCallback(); // Wait for Floating UI
  await click(target);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when arbitrary content in its default slot is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>

      <button>Button</button>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const content = host.querySelectorAll('button')[1];

  await requestIdleCallback(); // Wait for Floating UI
  await click(content);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains closed when its target is clicked and the event is canceled at its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  target?.addEventListener('click', (event: Event) => event.preventDefault());
  await click(target);

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('remains closed when its target is clicked and the event is canceled at its host', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  host.addEventListener('click', (event: Event) => event.preventDefault());

  await click(target);
  await sendKeys({ press: 'Enter' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open on click is has no Options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-options></glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await click(target);

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked and `disabled` is set on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await click(host.querySelector('button'));

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked after `disabled` is set on its target programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  assert(target);
  target.disabled = true;

  await click(target);

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked after `aria-disabled` is set on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await click(target);

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked after `aria-disabled` is set on its target programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  assert(target);
  target.ariaDisabled = 'true';

  await click(target);

  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('opens its sub-Menus when its sub-Menu targets are clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI

  // A programmatic click instead of an actual one because `sendMouse()` (via
  // `mouse.ts`) turned out to be flaky in CI.
  //
  // After a bunch of experimentation and source code digging, the ultimate cause of
  // the `sendMouse()` flakiness isn't clear. The immediate cause seems to be
  // that it clicks an Option or an element outside Menu instead of the target,
  // causing Menu to close. Though it only happens when nested popovers are present
  // via sub-Menus.
  //
  // `sendMouse()` is just a thin abstraction over Playwright's equivalent API. So
  // the ultimate cause is likely Playwright or Chromium's DevTools Protocol, which
  // Playwright relies on. It's that or I'm missing something obvious. Either way,
  // it was time to move on.
  targets[1]?.click();

  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[1]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await requestIdleCallback(); // Wait for Floating UI
  targets[2]?.click();
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('true');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[1]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[2]?.querySelector('glide-core-option')?.id);
});

it('closes when its target is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host?.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(target);

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when in another component and its target clicked', async () => {
  const host = await fixture<MenuInAnotherComponent>(
    html`<glide-core-menu-in-another-component></glide-core-menu-in-another-component>`,
  );

  const menu = host.shadowRoot?.querySelector('glide-core-menu');
  const target = host.shadowRoot?.querySelector('button');

  const defaultSlot = menu?.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(target);

  expect(menu?.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when in another component and an Option is clicked', async () => {
  const host = await fixture<MenuInAnotherComponent>(
    html`<glide-core-menu-in-another-component></glide-core-menu-in-another-component>`,
  );

  const menu = host.shadowRoot?.querySelector('glide-core-menu');
  const target = host.shadowRoot?.querySelector('button');
  const option = host.shadowRoot?.querySelector('glide-core-option');

  const defaultSlot = menu?.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(option);

  expect(menu?.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes itself and its sub-Menus when something outside of it is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(document.body);

  expect(hosts[0]?.open).to.be.false;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes its sub-Menus when their targets are clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[2]);
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[1]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[1]);
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes its nested sub-Menu when the super-Menu of the sub-Menu is closed via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[1]);

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an Option is selected via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.querySelector('glide-core-option'));

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when a sub-Menu Option is selected via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[2]);

  expect(hosts[0]?.open).to.be.false;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes sibling sub-Menus when a new sub-Menu is opened via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Three"></glide-core-option>

        <glide-core-option label="Four">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Five"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[2]);

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.be.null;
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.equal('true');
  expect(options[4]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.be.true;
});

it('activates the first Option(s) of its sub-Menus they are opened via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                    <glide-core-option label="Four"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Five"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[1]);
  await requestIdleCallback(); // Wait for Floating UI
  await click(targets[2]);
  await aTimeout(0); // Wait for the timeout in `#onTargetSlotClick()`

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[1]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[2]?.id);
});
