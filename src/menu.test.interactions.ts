import './menu.button.js';
import './menu.options.js';
import { LitElement } from 'lit';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import { click, hover } from './library/mouse.js';
import Menu from './menu.js';
import MenuLink from './menu.link.js';

@customElement('glide-core-nested-slot')
class NestedSlot extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <slot></slot>
      </glide-core-menu-options>
    </glide-core-menu>`;
  }
}

@customElement('glide-core-menu-in-another-component')
class MenuInAnotherComponent extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`;
  }
}

it('opens on click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-menu-options');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('opens when opened programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-menu-options');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('opens when `disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens when `aria-disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target" aria-disabled="true">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.ariaDisabled = 'false';

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when the menu edge is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = host.querySelector('button');
  const defaultSlot = host.shadowRoot?.querySelector('slot:not([name])');

  await click(host.shadowRoot?.querySelector('slot:not([name])'), 'left');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when a disabled option is clicked via `click()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label" disabled></glide-core-menu-link>

        <glide-core-menu-button
          label="Button"
          disabled
        ></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('glide-core-menu-link')?.click();
  host.querySelector('glide-core-menu-button')?.click();

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when a disabled link is clicked via `sendMouse()`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.querySelector('glide-core-menu-link'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when its options are clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host
    .querySelector('glide-core-menu-options')
    ?.addEventListener('click', (event: Event) => event.preventDefault());

  await click(host.querySelector('glide-core-menu-button'));
  await click(host.querySelector('glide-core-menu-link'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  // Enter and Space are different than a mouse click in that they additionally produce
  // a "click" on the option itself via the `#activeOption?.click()` in `#onSlotKeydown`.
  // So we, like the consumer, have to cancel that event too to stop Menu from closing.
  host
    .querySelector('glide-core-menu-options')
    ?.addEventListener('click', (event: Event) => event.preventDefault());

  const target = host.querySelector('button');
  target?.addEventListener('click', (event: Event) => event.preventDefault());

  await click(target);
  target?.focus();
  await sendKeys({ press: 'Enter' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains closed when its target is clicked and the event is canceled', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Label"></glide-core-menu-button>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  target?.addEventListener('click', (event: Event) => event.preventDefault());

  await click(target);
  target?.focus();
  await sendKeys({ press: 'Enter' });
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when `open` is set programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.open = false;
  await host.updateComplete;

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');
  const options = host.querySelector('glide-core-menu-options');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('does not open on click when there are no options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `disabled` is set on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.disabled = true;
  await click(target);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `aria-disabled` is set on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  await click(target);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `aria-disabled` is set programmatically on its target', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  assert(target);

  target.ariaDisabled = 'true';
  await click(target);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('opens on Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Enter when its target is a `<span>`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('span')?.focus();
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('span');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowUp', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowUp' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowDown', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Space when its target is a `<span>`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('span')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('span');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('does not open on Space when there are no options', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

// See the comment in `connectedCallback()` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
    { parentNode: div },
  );

  const anotherElement = document.createElement('button');
  anotherElement.addEventListener('click', () => (host.open = true));
  anotherElement.textContent = 'Another element';
  div.append(anotherElement);
  await click(anotherElement);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');
  const link = host.querySelector('glide-core-menu-link');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('closes when its target clicked', async () => {
  const host = await fixture<MenuInAnotherComponent>(
    html`<glide-core-menu-in-another-component></glide-core-menu-in-another-component>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = host.shadowRoot?.querySelector('button');

  const menu = host.shadowRoot?.querySelector('glide-core-menu');

  const defaultSlot =
    menu?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = menu?.querySelector('glide-core-menu-options');

  await click(target);

  expect(menu?.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when something outside of it is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(document.body);

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes on Escape', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for it to open
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via click', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('glide-core-menu-link'));

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();

  await hover(host.querySelector('glide-core-menu-link'));
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Enter and its target is a `<span>', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('span')?.focus();

  await hover(host.querySelector('glide-core-menu-link'));
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('span');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('button');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Space and its target is a `<span>`', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('span')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');
  const target = host.querySelector('span');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(target?.ariaExpanded).to.equal('false');
});

it('activates the first link by default', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(links[0]?.privateActive).to.be.true;
  expect(links[1]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first button by default when opened via click', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  await click(host.querySelector('button'));

  const buttons = host.querySelectorAll('glide-core-menu-button');
  const options = host.querySelector('glide-core-menu-options');

  expect(buttons[0]?.privateActive).to.be.true;
  expect(buttons[1]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[0]?.id);
});

it('activates a link on hover', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  await hover(links[1]);

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates a link on hover when the link is in a nested slot', async () => {
  const host = await fixture<NestedSlot>(html`
    <glide-core-nested-slot>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-nested-slot>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');

  const options = host.shadowRoot?.querySelector('glide-core-menu-options');

  await hover(links[1]);

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates a button on hover', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const buttons = host.querySelectorAll('glide-core-menu-button');
  const options = host.querySelector('glide-core-menu-options');

  await hover(buttons[1]);

  expect(buttons[0]?.privateActive).to.be.false;
  expect(buttons[1]?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[1]?.id);
});

it('activates a button on hover when the button is in a nested slot', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-nested-slot>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-nested-slot>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-button');

  const options = host.shadowRoot?.querySelector('glide-core-menu-options');

  await hover(links[1]);

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the next option on ArrowDown', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the previous enabled option on ArrowUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two" disabled></glide-core-menu-link>
        <glide-core-menu-link label="Three"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  expect(links[0]?.privateActive).to.be.true;
  expect(links[1]?.privateActive).to.be.false;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first enabled option on Home', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One" disabled></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Home' });

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the first enabled option on PageUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One" disabled></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'PageUp' });

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the first enabled option on Meta + ArrowUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One" disabled></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the last enabled option on End', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'End' });

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the last enabled option on PageDown', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'PageDown' });

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('activates the last enabled option on Meta + ArrowDown', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const links = host.querySelectorAll('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(links[0]?.privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
  expect(links[2]?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1]?.id);
});

it('sets `aria-activedescendant` on open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const link = host.querySelector('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('sets `aria-activedescendant` on close', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.querySelector('button'));

  const options = host.querySelector('glide-core-menu-options');
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets `aria-expanded` on open', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(host.querySelector('button'));

  const target = host.querySelector('button');
  expect(target?.getAttribute('aria-expanded')).to.equal('true');
});

it('sets `aria-expanded` on close', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.querySelector('button'));

  const target = host.querySelector('button');
  expect(target?.getAttribute('aria-expanded')).to.equal('false');
});

it('does not wrap on ArrowUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'ArrowUp' });

  const link = host.querySelector('glide-core-menu-link');
  expect(link?.privateActive).to.be.true;
});

it('does not wrap on Meta + ArrowUp', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const link = host.querySelector('glide-core-menu-link');
  expect(link?.privateActive).to.be.true;
});

it('does not wrap on ArrowDown', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });

  const option = host.querySelector<MenuLink>(
    'glide-core-menu-link:last-of-type',
  );

  expect(option?.privateActive).to.be.true;
});

it('sets the first enabled option as active when optionless and options are programmatically added', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const firstOption = document.createElement('glide-core-menu-button');
  firstOption.label = 'One';
  firstOption.disabled = true;

  const secondOption = document.createElement('glide-core-menu-button');
  secondOption.label = 'Two';

  const thirdOption = document.createElement('glide-core-menu-button');
  thirdOption.label = 'One';

  host.querySelector('glide-core-menu-options')?.append(firstOption);
  host.querySelector('glide-core-menu-options')?.append(secondOption);
  host.querySelector('glide-core-menu-options')?.append(thirdOption);
  await host.updateComplete;

  expect(firstOption?.privateActive).to.be.false;
  expect(secondOption?.privateActive).to.be.true;
  expect(thirdOption?.privateActive).to.be.false;
});

it('sets the next enabled option as active when current option is programmatically disabled', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = host.querySelectorAll('glide-core-menu-link');
  assert(links[0]);

  links[0].disabled = true;

  expect(links[0].privateActive).to.be.false;
  expect(links[1]?.privateActive).to.be.true;
});

it('sets the previous enabled option as active when current option is programmatically disabled', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
        <glide-core-menu-button label="Three" disabled></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const buttons = host.querySelectorAll('glide-core-menu-button');
  assert(buttons[1]);

  await hover(buttons[1]);
  buttons[1].disabled = true;

  expect(buttons[0]?.privateActive).to.be.true;
  expect(buttons[1].privateActive).to.be.false;
  expect(buttons[2]?.privateActive).to.be.false;
});

it('retains its active option when an option is programmatically added', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  await hover(host.querySelector('glide-core-menu-button:last-of-type'));

  const button = document.createElement('glide-core-menu-button');
  button.label = 'Three';

  host.querySelector('glide-core-menu-options')?.append(button);
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-menu-button');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('shows loading feedback', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.loading = true;
  await host.updateComplete;

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-menu-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.equal('Loading');
  expect(feedback?.checkVisibility()).to.be.true;
});

it('hides loading feedback', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu loading open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.loading = false;
  await host.updateComplete;

  const target = host.querySelector('button');

  const feedback = host
    ?.querySelector('glide-core-menu-options')
    ?.shadowRoot?.querySelector('[data-test="loading-feedback"]');

  expect(target?.ariaDescription).to.be.null;
  expect(feedback?.checkVisibility()).to.not.be.ok;
});

it('has `set offset()` coverage', async () => {
  const host = await fixture<Menu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  host.offset = 10;
});
