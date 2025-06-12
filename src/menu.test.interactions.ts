import './options.js';
import { LitElement } from 'lit';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  waitUntil,
} from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import { click, hover } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import Tooltip from './tooltip.js';

@customElement('glide-core-options-in-nested-slot')
class OptionsInNestedSlot extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <slot></slot>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  }
}

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

it('opens when opened programmatically', async () => {
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

  host.open = true;
  await aTimeout(0); // Wait for Floating UI

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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return defaultSlots[0]?.checkVisibility();
  });

  await click(targets[1]);

  expect(hosts[0]?.open).to.be.true;
  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(defaultSlots[0]?.checkVisibility()).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return defaultSlots[1]?.checkVisibility();
  });

  await click(targets[2]);

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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

it('closes when closed programmatically', async () => {
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

  await aTimeout(0); // Wait for Floating UI
  host.open = false;
  await host.updateComplete;

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

it('opens on Enter', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens on Enter when its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Two ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens on ArrowUp', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens on ArrowDown', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens on Space', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens on Space when its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Two ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('does not open on Space is has no Options', async () => {
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

  await sendKeys({ press: 'Tab' });
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

it('opens its sub-Menus on ArrowRight', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Five ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six ${'x'.repeat(500)}"></glide-core-option>
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

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.be.null;
  expect(options[4]?.ariaExpanded).to.be.null;
  expect(options[5]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.true;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;

  await sendKeys({ press: 'ArrowRight' });

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('true');
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.be.null;
  expect(options[4]?.ariaExpanded).to.be.null;
  expect(options[5]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.true;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
});

it('does not scroll the page on open when various keys are pressed', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'ArrowUp' });

  let event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowDown' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: ' ' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;
});

it('does not scroll the page when already open and various keys are pressed', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'ArrowUp' });

  let event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowDown' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowRight' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowLeft' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'PageUp' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'PageDown' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'Home' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'End' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;
});

it('does not scroll the page when already open and various keys are pressed and arbitrary content in its default slot is focused', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>

      <button>Button</button>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' }); // Target
  await sendKeys({ press: 'Tab' }); // Button
  sendKeys({ press: 'ArrowUp' });

  let event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowDown' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowRight' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'ArrowLeft' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'PageUp' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'PageDown' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'Home' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;

  sendKeys({ press: 'End' });

  event = await oneEvent(host, 'keydown');
  expect(event.defaultPrevented).to.be.true;
});

// See the comment in `connectedCallback()` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const container = document.createElement('div');

  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
    { parentNode: container },
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const anotherElement = document.createElement('button');

  anotherElement.addEventListener('click', () => (host.open = true));
  anotherElement.textContent = 'Another element';

  container.append(anotherElement);
  await click(anotherElement);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
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

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return defaultSlots[0]?.checkVisibility();
  });

  await click(targets[1]);

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

  await click(targets[2]);

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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return (
      defaultSlots[0]?.checkVisibility() &&
      defaultSlots[1]?.checkVisibility() &&
      defaultSlots[2]?.checkVisibility()
    );
  });

  await click(targets[2]);

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

  await click(targets[1]);

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

it('closes its nested sub-Menu when the super-Menu of the sub-Menu is closed', async () => {
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

  await aTimeout(0); // Wait for Floating UI
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

it('closes its sub-Menus and itself on Escape', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>
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

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

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

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.true;
  expect(tooltips[2]?.open).to.be.false;

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

  await sendKeys({ press: 'Escape' });

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

  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;

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

  await sendKeys({ press: 'Escape' });

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

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;

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

it('closes on Escape when arbitrary content in its default slot has focus ', async () => {
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

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // Target
  await sendKeys({ press: 'Tab' }); // Button
  await sendKeys({ press: 'Escape' });

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
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

  await aTimeout(0); // Wait for Floating UI
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

  await aTimeout(0); // Wait for Floating UI
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

it('closes when an Option is selected via Enter', async () => {
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when a sub-Menu Option is selected via Enter', async () => {
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(hosts[0]?.open).to.be.false;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.null;
  expect(targets[2]?.ariaExpanded).to.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.null;

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

it('closes when its target is a SPAN and an Option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).to.not.be.ok;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an Option is selected via Space', async () => {
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

  await sendKeys({ press: 'Tab' });
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

it('closes when a sub-Menu Option is selected via Space', async () => {
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

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

it('closes when its target is a SPAN and an Option is selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await sendKeys({ press: 'Tab' });
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

it('closes its sub-Menus on ArrowLeft', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Five ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six ${'x'.repeat(500)}"></glide-core-option>
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

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.be.null;
  expect(options[4]?.ariaExpanded).to.be.null;
  expect(options[5]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.true;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;

  await sendKeys({ press: 'ArrowLeft' });

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.be.null;
  expect(options[4]?.ariaExpanded).to.be.null;
  expect(options[5]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;

  // Once more to verify that a second ArrowLeft doesn't close the top-level menu.
  await sendKeys({ press: 'ArrowLeft' });

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;
  expect(options[3]?.ariaExpanded).to.be.null;
  expect(options[4]?.ariaExpanded).to.be.null;
  expect(options[5]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
});

it('closes its tooltip when a sub-Menu target is hovered', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option
                label="Two ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  for (const tooltip of tooltips) {
    const element = tooltip?.shadowRoot?.querySelector('[data-test="tooltip"]');

    if (element instanceof HTMLElement) {
      element.dataset.closeDelay = '0';
      element.dataset.openDelay = '0';
    }
  }

  await aTimeout(0); // Wait for Floating UI
  await hover(options[0]);

  // For whatever reason, there's a significant delay between hovering and
  // the subsequent "mouseover" event. The more tests, the greater the delay.
  await waitUntil(() => {
    return tooltips[0]?.open;
  });

  await hover(targets[1]);

  // For whatever reason, there's a significant delay between hovering and
  // the resultant "mouseout" event. The more tests, the greater the delay.
  await waitUntil(() => {
    return !tooltips[0]?.open;
  });
});

it('closes sibling sub-Menus when a new sub-Menu is opened', async () => {
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

  await aTimeout(0); // Wait for Floating UI
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

it('closes child sub-Menus when the target of a super-Menu is disabled', async () => {
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

  const options = host.querySelectorAll('glide-core-option');
  const targets = host.querySelectorAll('button');
  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  await aTimeout(0); // Wait for Floating UI

  assert(targets[1]);
  targets[1].disabled = true;

  await aTimeout(0); // Wait for the Mutation Observer

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
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
});

it('is opened when open and `disabled` is set on its target programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

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

  assert(target);
  target.disabled = false;

  await aTimeout(0); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('is opened when open and `aria-disabled` is set on its target programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" aria-disabled="true">Target</button>

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

  assert(target);
  target.ariaDisabled = 'false';

  await aTimeout(0); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('activates its first Option when first opened', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await click(target);

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[0]?.id);
});

it('activates its previously active Option when reopened', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[1]);
  await click(target); // Close
  await click(target); // Reopen

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[1]?.id);
});

it('activates its first Option when reopened and its previously active Option has since been disabled', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[2]);
  await click(target); // Close

  assert(options[2]);
  options[2].disabled = true;

  await click(target); // Reopen

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[0]?.id);
});

it('activates the first Options of its sub-Menus they are opened', async () => {
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

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return defaultSlots[0]?.checkVisibility();
  });

  await click(targets[1]);
  await click(targets[2]);

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return (
      defaultSlots[1]?.checkVisibility() && defaultSlots[2]?.checkVisibility()
    );
  });

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

it('activates an Option on hover', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Two ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  for (const tooltip of tooltips) {
    const element = tooltip?.shadowRoot?.querySelector('[data-test="tooltip"]');

    if (element instanceof HTMLElement) {
      element.dataset.closeDelay = '0';
      element.dataset.openDelay = '0';
    }
  }

  await aTimeout(0); // Wait for Floating UI
  await hover(options[1]);
  await aTimeout(0); // Wait for Tooltip's `#onComponentMouseOver()`

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('does not open the tooltip of a super-Menu Option when one of its sub-Menu Options is hovered', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option
                label="Two ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  for (const tooltip of tooltips) {
    const element = tooltip?.shadowRoot?.querySelector('[data-test="tooltip"]');

    if (element instanceof HTMLElement) {
      element.dataset.closeDelay = '0';
      element.dataset.openDelay = '0';
    }
  }

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening Menus
  // in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return (
      defaultSlots[0]?.checkVisibility() && defaultSlots[1]?.checkVisibility()
    );
  });

  await hover(options[1]);

  // For whatever reason, there's a significant delay between hovering and
  // the subsequent "mouseover" event. The more tests, the greater the delay.
  await waitUntil(() => {
    return tooltips[1]?.open;
  });

  expect(tooltips[0]?.open).to.be.false;
});

it('retains its active Option when a sub-Menu Option is hovered', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Four"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[3]);
  await hover(options[2]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);
});

it('activates Options on hover when all or some are in a nested slot', async () => {
  const host = await fixture<OptionsInNestedSlot>(html`
    <glide-core-options-in-nested-slot>
      <glide-core-option label="One"></glide-core-option>
      <glide-core-option label="Two"></glide-core-option>
    </glide-core-options-in-nested-slot>
  `);

  const options = [
    ...host.querySelectorAll('glide-core-option'),
    host.shadowRoot?.querySelector('glide-core-option'),
  ];

  await aTimeout(0); // Wait for Floating UI
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  await hover(options[2]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);
});

it('activates the next enabled Option on ArrowDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
                disabled
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option
          label="Eight ${'x'.repeat(500)}"
          disabled
        ></glide-core-option>

        <glide-core-option label="Nine ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.true;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[4]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.true;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.true;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[6]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.true;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.true;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[8]?.id);

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

it('activates the next sub-Menu Option on ArrowDown after an Option of another Menu is activated', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option
                label="Two ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Three ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Four ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option
                label="Five ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  for (const tooltip of tooltips) {
    const element = tooltip?.shadowRoot?.querySelector('[data-test="tooltip"]');

    if (element instanceof HTMLElement) {
      element.dataset.closeDelay = '0';
      element.dataset.openDelay = '0';
    }
  }

  await aTimeout(0); // Wait for Floating UI
  await hover(options[3]); // Four
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Three

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.true;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the next enabled Option on ArrowUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
                disabled
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option
          label="Eight ${'x'.repeat(500)}"
          disabled
        ></glide-core-option>

        <glide-core-option label="Nine ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.true;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.true;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.true;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

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

it('activates the first enabled Option on Home', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}" disabled>
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}" disabled>
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Nine ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('activates the first enabled Option on PageUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}" disabled>
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}" disabled>
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Nine ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'PageDown' });
  await sendKeys({ press: 'PageUp' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'PageDown' });
  await sendKeys({ press: 'PageUp' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'PageDown' });
  await sendKeys({ press: 'PageUp' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('activates the first enabled Option on Meta + ArrowUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}" disabled>
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}" disabled>
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>
        <glide-core-option label="Nine ${'x'.repeat(500)}"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('activates the last enabled Option on End', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
                disabled
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>

        <glide-core-option
          label="Nine ${'x'.repeat(500)}"
          disabled
        ></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('activates the last enabled Option on PageDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
                disabled
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>

        <glide-core-option
          label="Nine ${'x'.repeat(500)}"
          disabled
        ></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('activates the last enabled Option on Meta + ArrowDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One ${'x'.repeat(500)}">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two ${'x'.repeat(500)}">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Four ${'x'.repeat(500)}"
                    ></glide-core-option>

                    <glide-core-option
                      label="Five ${'x'.repeat(500)}"
                      disabled
                    ></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option
                label="Six ${'x'.repeat(500)}"
              ></glide-core-option>

              <glide-core-option
                label="Seven ${'x'.repeat(500)}"
                disabled
              ></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight ${'x'.repeat(500)}"></glide-core-option>

        <glide-core-option
          label="Nine ${'x'.repeat(500)}"
          disabled
        ></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  const tooltips = [...options]
    .map((option) => option.shadowRoot?.querySelector('[data-test="tooltip"]'))
    .filter((element): element is Tooltip => element instanceof Tooltip);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.true;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

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

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.true;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.false;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[5]?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

  expect(tooltips[0]?.open).to.be.false;
  expect(tooltips[1]?.open).to.be.false;
  expect(tooltips[2]?.open).to.be.false;
  expect(tooltips[3]?.open).to.be.false;
  expect(tooltips[4]?.open).to.be.false;
  expect(tooltips[5]?.open).to.be.false;
  expect(tooltips[6]?.open).to.be.false;
  expect(tooltips[7]?.open).to.be.true;
  expect(tooltips[8]?.open).to.be.false;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[7]?.id);

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

it('does not wrap on ArrowUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('does not wrap on ArrowDown', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('sets the first enabled Option as active when Optionless and Options are added programmatically', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-options></glide-core-options>
    </glide-core-menu>
  `);

  const firstOption = document.createElement('glide-core-option');
  firstOption.label = 'One';
  firstOption.disabled = true;

  const secondOption = document.createElement('glide-core-option');
  secondOption.label = 'Two';

  const thirdOption = document.createElement('glide-core-option');
  thirdOption.label = 'One';

  host.querySelector('glide-core-options')?.append(firstOption);
  host.querySelector('glide-core-options')?.append(secondOption);
  host.querySelector('glide-core-options')?.append(thirdOption);

  await aTimeout(0); // Wait for Floating UI
  await host.updateComplete;
  await secondOption.updateComplete;

  expect(firstOption?.privateActive).to.be.false;
  expect(secondOption?.privateActive).to.be.true;
  expect(thirdOption?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(secondOption.id);
});

it('sets the next enabled Option as active when the active Option is disabled programmatically', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI

  assert(options[0]);
  options[0].disabled = true;
  await options[1]?.updateComplete;

  expect(options[0].privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('sets the previously enabled Option as active when current Option is disabled programmatically', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[2]);

  assert(options[2]);
  options[2].disabled = true;
  await options[2].updateComplete;

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2].privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('retains its active Option when an Option is programmatically added', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  await aTimeout(0); // Wait for Floating UI
  await hover(host.querySelector('glide-core-option:last-of-type'));

  const button = document.createElement('glide-core-option');
  button.label = 'Three';

  host.querySelector('glide-core-options')?.append(button);
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('has limited keyboard functionality when loading', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" loading>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Four">
          <glide-core-menu slot="submenu" loading>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Five"></glide-core-option>
              <glide-core-option label="Six"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  assert(hosts[0]);
  assert(hosts[1]);
  assert(hosts[2]);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  expect(hosts[0]?.open).to.be.false;

  await sendKeys({ press: ' ' });

  expect(hosts[0]?.open).to.be.true;

  await sendKeys({ press: 'Escape' });
  await sendKeys({ press: 'Enter' });

  expect(hosts[0]?.open).to.be.true;

  await sendKeys({ press: 'Escape' });
  await sendKeys({ press: 'ArrowDown' });

  expect(hosts[0]?.open).to.be.true;

  await sendKeys({ press: 'Escape' });
  await sendKeys({ press: 'ArrowUp' });

  expect(hosts[0]?.open).to.be.true;

  await sendKeys({ press: 'ArrowRight' });

  expect(hosts[1]?.open).to.be.false;

  await sendKeys({ press: 'ArrowDown' }); // One
  await sendKeys({ press: 'End' }); // One
  await sendKeys({ press: 'PageDown' }); // One

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;

  hosts[0].loading = false;
  await sendKeys({ press: 'ArrowDown' }); // Three
  hosts[0].loading = true;

  await sendKeys({ press: 'ArrowUp' }); // Four
  await sendKeys({ press: 'Home' }); // Four
  await sendKeys({ press: 'PageUp' }); // Four

  expect(options[0]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;

  hosts[0].loading = false;

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'ArrowDown' }); // Five
  await sendKeys({ press: 'End' }); // Five
  await sendKeys({ press: 'PageDown' }); // Five

  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;

  hosts[2].loading = false;
  await sendKeys({ press: 'ArrowDown' }); // Six
  hosts[2].loading = true;

  await sendKeys({ press: 'ArrowUp' }); // Six
  await sendKeys({ press: 'Home' }); // Six
  await sendKeys({ press: 'PageUp' }); // Six

  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;

  await sendKeys({ press: 'Escape' });
  expect(hosts[2].open).to.be.false;
});

it('shows loading feedback', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  host.loading = true;
  await host.updateComplete;

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.equal('Loading');
  expect(feedback?.checkVisibility()).to.be.true;
});

it('hides loading feedback', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  host.loading = false;
  await host.updateComplete;

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.be.null;
  expect(feedback?.checkVisibility()).to.not.be.ok;
});

it('has `set offset()` coverage', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  host.offset = 10;
});
