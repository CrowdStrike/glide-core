import './options.js';
import './options.group.js';
import { LitElement } from 'lit';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import requestIdleCallback from './library/request-idle-callback.js';
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
  await hover(options[1]);

  // For whatever reason, there's a significant delay between hovering and
  // the subsequent "mouseover" event. The more tests, the greater the delay.
  await waitUntil(() => {
    return !tooltips[0]?.open && tooltips[1]?.open;
  });
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

it('activates Options on hover when they are in Options Groups', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-options-group label="A">
          <glide-core-option label="One"></glide-core-option>
          <glide-core-option label="Two"></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group label="B">
          <glide-core-option label="Three"></glide-core-option>
          <glide-core-option label="Four"></glide-core-option>
        </glide-core-options-group>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');
  await requestIdleCallback(); // Wait for Floating UI
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  await hover(options[3]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);
});
