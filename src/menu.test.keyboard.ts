import './options.js';
import './options.group.js';
import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import requestIdleCallback from './library/request-idle-callback.js';
import { hover } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import Tooltip from './tooltip.js';

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

it('does not open on Space when it has no Options', async () => {
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Four">
          <glide-core-menu slot="submenu" open>
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

  await requestIdleCallback(); // Wait for Floating UI
  await hover(options[3]); // Four
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Three

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;

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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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

  await requestIdleCallback(); // Wait for Floating UI
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
