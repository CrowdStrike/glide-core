import './options.js';
import './option.js';
import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Menu from './menu.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';
import requestIdleCallback from './library/request-idle-callback.js';

@customElement('glide-core-subclassed')
class Subclassed extends Menu {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu')).to.equal(Menu);
});

it('is accessible', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Three" href="/"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(targets[0]?.ariaHasPopup).to.equal('true');
  expect(targets[1]?.ariaHasPopup).to.be.null;
  expect(options[0]?.ariaHasPopup).to.equal('true');
  expect(options[1]?.ariaHasPopup).to.be.null;

  expect(
    hosts[0]?.querySelector('glide-core-options')?.ariaLabelledby,
  ).to.equal(targets[0]?.id);

  expect(
    hosts[1]?.querySelector('glide-core-options')?.ariaLabelledby,
  ).to.equal(targets[1]?.id);

  await expect(host).to.be.accessible();
});

it('is accessible when its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('span');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('is accessible when its target is a DIV', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <div slot="target">Target</div>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('div');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('is accessible when Options is a menu', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <div slot="target">Target</div>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('div');

  expect(target?.ariaHasPopup).to.equal('true');
});

it('is accessible when Options is a listbox', async () => {
  const host = await fixture<Menu>(
    /* eslint-disable lit-a11y/accessible-name */
    html`<glide-core-menu>
      <div slot="target">Target</div>

      <glide-core-options role="listbox">
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('div');

  expect(target?.ariaHasPopup).to.equal('listbox');
});

it('is accessible when its target is an SVG', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        slot="target"
        height="1rem"
        width="1rem"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('svg');

  expect(target?.tabIndex).to.equal(0);
  expect(target?.role).to.equal('button');
});

it('makes sub-Menu targets unfocusable by the user', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <span slot="target" tabindex="0">Target</span>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu>
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

  const targets = host.querySelectorAll<HTMLElement>('[slot="target"]');

  expect(targets[1]?.tabIndex).to.equal(-1);
  expect(targets[2]?.tabIndex).to.equal(-1);
});

it('is open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('is open when it and its sub-Menu are open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Label"></glide-core-option>
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

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
});

it('closes open sub-Menus when it is not open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
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

        <glide-core-option label="Three">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Four"></glide-core-option>
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

  expect(hosts[0]?.open).to.be.false;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.be.null;
  expect(options[2]?.ariaExpanded).to.equal('false');
  expect(options[3]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;
});

it('closes all but the first open sub-Menu when it and multiple sub-Menus are open', async () => {
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

        <glide-core-option label="Three">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Four"></glide-core-option>
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

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.be.null;
  expect(options[2]?.ariaExpanded).to.equal('false');

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;
});

it('activates the first enabled Option when open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled>
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two" disabled>
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option
                      label="Three"
                      disabled
                    ></glide-core-option>

                    <glide-core-option label="Four"></glide-core-option>
                    <glide-core-option label="Five"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Six"></glide-core-option>
              <glide-core-option label="Seven"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Eight"></glide-core-option>
        <glide-core-option label="Nine"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];
  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.true;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.true;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.true;
  expect(options[8]?.privateActive).to.be.false;

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
});

it('is not opened when open and its target is `disabled`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

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

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

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

it('is not opened when open and its target is `aria-disabled`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" aria-disabled="true">Target</button>

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

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('shows loading feedback when open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  await requestIdleCallback(); // Wait for Floating UI

  expect(target?.ariaDescription).to.equal('Loading');
  expect(feedback?.checkVisibility()).to.be.true;
});

it('does not clobber the ID of its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button id="id" slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  expect(host.querySelector('button')?.id).to.equal('id');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-menu>
        <button slot="target">Target</button>
      </glide-core-menu>`,
    );
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-menu>
        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>`,
    );
  });
});

it('throws when the target of a sub-Menu is an Input', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-menu>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One">
            <glide-core-menu slot="submenu">
              <glide-core-input label="Target" slot="target"></glide-core-input>

              <glide-core-options>
                <glide-core-option label="Two"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </glide-core-option>
        </glide-core-options>
      </glide-core-menu>`,
    );
  });
});
