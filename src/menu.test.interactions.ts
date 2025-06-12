import './options.js';
import { LitElement } from 'lit';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import { click, hover } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';

// TODO: label should be "One" and "Two" throughout

@customElement('glide-core-options-in-nested-slot')
class OptionsInNestedSlot extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <slot></slot>
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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  await click(target);

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('opens when opened programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  host.open = true;
  await aTimeout(0); // Wait for Floating UI

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const option = host.querySelector('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when the edge of its default slot is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const target = host.querySelector('button');
  const defaultSlot = host.shadowRoot?.querySelector('slot:not([name])');
  const option = host.querySelector('glide-core-option');

  await click(defaultSlot, 'left');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when a disabled option is clicked via `click()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two" disabled></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  host.querySelector('glide-core-option')?.click();
  host.querySelector('glide-core-option')?.click();

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('remains open when a disabled option is clicked via `sendMouse()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.querySelector('glide-core-option'));

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('remains open when an option is clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  host
    .querySelector('glide-core-options')
    ?.addEventListener('click', (event: Event) => event.preventDefault());

  await aTimeout(0); // Wait for Floating UI
  await click(host.querySelector('glide-core-option'));

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when open and its target is clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await click(target);
  await sendKeys({ press: 'Enter' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains closed when closed and its target is clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  target?.addEventListener('click', (event: Event) => event.preventDefault());

  await click(target);
  await sendKeys({ press: 'Enter' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

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

  await aTimeout(0); // Wait for Floating UI

  host.open = false;
  await host.updateComplete;

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open on click when there are no options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-options> </glide-core-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(target?.ariaExpanded).to.equal('false');
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

  await click(host.querySelector('button'));

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked and `disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.disabled = true;
  await click(target);

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked and `aria-disabled` is set on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  await click(target);

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('does not open when clicked and `aria-disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.ariaDisabled = 'true';
  await click(target);

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('span');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

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
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('span');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('does not open on Space when there are no options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-options> </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('opens its submenus on ArrowRight', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  await sendKeys({ press: 'ArrowRight' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.true;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('true');
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

  const anotherElement = document.createElement('button');

  anotherElement.addEventListener('click', () => (host.open = true));
  anotherElement.textContent = 'Another element';

  container.append(anotherElement);
  await click(anotherElement);

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('opens its submenus when the submenu targets are clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu">
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
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = [
    ...host.querySelectorAll('button'),
    host.querySelector('svg'),
  ];

  await aTimeout(0); // Wait for Floating UI
  await click(targets?.[1]);

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[0]?.querySelector('glide-core-option')?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[1]?.querySelector('glide-core-option')?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await click(targets?.[2]);

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.true;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('true');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[0]?.querySelector('glide-core-option')?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[1]?.querySelector('glide-core-option')?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[2]?.querySelector('glide-core-option')?.id);
});

it('closes when its target clicked', async () => {
  const host = await fixture<MenuInAnotherComponent>(
    html`<glide-core-menu-in-another-component></glide-core-menu-in-another-component>`,
  );

  const target = host.shadowRoot?.querySelector('button');

  await aTimeout(0); // Wait for Floating UI
  await click(target);

  const menu = host.shadowRoot?.querySelector('glide-core-menu');

  const defaultSlot =
    menu?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(menu?.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes itself and its submenus when something outside of it is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
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
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(document.body);

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  expect(menus[0]?.open).to.be.false;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes its submenus and itself on Escape', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
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
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[0]?.querySelector('glide-core-option')?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[1]?.querySelector('glide-core-option')?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'Escape' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(menus[0]?.querySelector('glide-core-option')?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'Escape' });

  expect(menus[0]?.open).to.be.false;
  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(targets[0]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an option is selected via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.querySelector('glide-core-option'));

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when a submenu option is selected via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
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
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  await click(
    host.querySelector('glide-core-menu glide-core-menu glide-core-option'),
  );

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  expect(menus[0]?.open).to.be.false;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when a submenu option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
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
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  expect(menus[0]?.open).to.be.false;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an option is selected via Enter and its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('span');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an option is selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when a submenu option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu" open>
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
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  expect(menus[0]?.open).to.be.false;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.false;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('false');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes when an option is selected via Space and its target is a SPAN', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('span');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('closes its submenus on ArrowLeft', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.true;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('true');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  await sendKeys({ press: 'ArrowLeft' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');

  // Once more to verify that a second ArrowLeft doesn't close the top-level menu.
  await sendKeys({ press: 'ArrowLeft' });

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.false;
  expect(defaultSlots[2]?.checkVisibility()).to.be.false;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('false');
});

it('closes sibling submenus when a submenu is opened', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Label"></glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two"></glide-core-option>

        <glide-core-option label="Three">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Label"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = menus.map((menu) =>
    menu.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])'),
  );

  const targets = host.querySelectorAll('button');

  await click(targets[2]);

  expect(menus[0]?.open).to.be.true;
  expect(menus[1]?.open).to.be.false;
  expect(menus[2]?.open).to.be.true;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.be.true;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.equal('false');
  expect(targets[2]?.ariaExpanded).to.equal('true');
});

it('is open when open and `disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  assert(target);
  target.disabled = false;

  await aTimeout(0); // Wait for Floating UI

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('is open when open and `aria-disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" aria-disabled="true">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  assert(target);
  target.ariaDisabled = 'false';

  await aTimeout(0); // Wait for Floating UI

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('activates the first option when first opened', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  await click(host.querySelector('button'));

  const options = host.querySelectorAll('glide-core-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[0]?.id);
});

it('activates the previously active option when reopened', async () => {
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
  const target = host.querySelector('button');

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

it('activates the first active option when reopened and the previous active option has been disabled', async () => {
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
  const target = host.querySelector('button');

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

it('activates the first options of submenus they are opened', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const menus = [host, ...host.querySelectorAll('glide-core-menu')];
  const targets = host.querySelectorAll('button');
  const options = host.querySelectorAll('glide-core-option');

  await click(targets[1]);
  await click(targets[2]);

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).equal(options[2]?.id);
});

it('activates an option on hover', async () => {
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
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('retains its active option when a submenu option is hovered', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[3]);
  await hover(options[2]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[3]?.id);

  expect(
    host
      .querySelector('glide-core-menu')
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);
});

it('activates an option on hover when the option is in a nested slot', async () => {
  const host = await fixture<OptionsInNestedSlot>(html`
    <glide-core-options-in-nested-slot>
      <glide-core-option label="One"></glide-core-option>
      <glide-core-option label="Two"></glide-core-option>
    </glide-core-options-in-nested-slot>
  `);

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host.shadowRoot
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('activates the next enabled option on ArrowDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
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

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[6]?.id);

  expect(
    menus[2]
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

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[8]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the next enabled option on ArrowUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
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

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
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

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the first enabled option on Home', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the first enabled option on PageUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the first enabled option on Meta + ArrowUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[2]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the last enabled option on End', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[4]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.true;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[6]?.id);

  expect(
    menus[2]
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
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.true;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[8]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the last enabled option on PageDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'PageDown' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[4]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.true;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[6]?.id);

  expect(
    menus[2]
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
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.true;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[8]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('activates the last enabled option on Meta + ArrowDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="One"></glide-core-option>
                    <glide-core-option label="Two" disabled></glide-core-option>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Two" disabled></glide-core-option>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Two" disabled></glide-core-option>
        <glide-core-option label="Three"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const options = host.querySelectorAll('glide-core-option');
  const menus = [host, ...host.querySelectorAll('glide-core-menu')];

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.true;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.false;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);

  expect(
    menus[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[4]?.id);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[3]?.privateActive).to.be.false;
  expect(options[4]?.privateActive).to.be.false;
  expect(options[5]?.privateActive).to.be.false;
  expect(options[6]?.privateActive).to.be.true;
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.false;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[6]?.id);

  expect(
    menus[2]
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
  expect(options[7]?.privateActive).to.be.false;
  expect(options[8]?.privateActive).to.be.true;

  expect(
    menus[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[8]?.id);

  expect(
    menus[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    menus[2]
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.querySelectorAll('glide-core-option');

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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two

  const options = host.querySelectorAll('glide-core-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('sets the first enabled option as active when optionless and options are programmatically added', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-options> </glide-core-options>
    </glide-core-menu>
  `);

  await aTimeout(0); // Wait for Floating UI

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
  await host.updateComplete;

  expect(firstOption?.privateActive).to.be.false;
  expect(secondOption?.privateActive).to.be.true;
  expect(thirdOption?.privateActive).to.be.false;
});

it('sets the next enabled option as active when active option is programmatically disabled', async () => {
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

  const options = host.querySelectorAll('glide-core-option');

  assert(options[0]);
  options[0].disabled = true;

  expect(options[0].privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('sets the previous enabled option as active when current option is programmatically disabled', async () => {
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

  // TODO: test aria-activedescdeant elsewhere
  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});

it('retains its active option when an option is programmatically added', async () => {
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
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>
  `);

  host.offset = 10;
});
