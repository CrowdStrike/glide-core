import './menu.button.js';
import './menu.options.js';
import { LitElement } from 'lit';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import { click, hover } from './library/mouse.js';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuLink from './menu.link.js';

@customElement('glide-core-nested-slot')
class GlideCoreNestedSlot extends LitElement {
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
class GlideCoreMenuInAnotherComponent extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`;
  }
}

it('opens on click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('button'));

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');
  const options = component.querySelector('glide-core-menu-options');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');
  const options = component.querySelector('glide-core-menu-options');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('opens when `disabled` is set programmatically on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  assert(target);

  target.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens when `aria-disabled` is set programmatically on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target" aria-disabled="true">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  assert(target);

  target.ariaDisabled = 'false';

  // Wait for Floating UI.
  await aTimeout(0);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when the menu edge is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = component.querySelector('button');
  const defaultSlot = component.shadowRoot?.querySelector('slot:not([name])');

  await click(component.shadowRoot?.querySelector('slot:not([name])'), 'left');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when a disabled option is clicked via `click()`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link" disabled></glide-core-menu-link>

        <glide-core-menu-button
          label="Button"
          disabled
        ></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('glide-core-menu-link')?.click();
  component.querySelector('glide-core-menu-button')?.click();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('remains open when a disabled link is clicked via `sendMouse()`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('glide-core-menu-link'));

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('closes when `open` is set programmatically', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.open = false;
  await component.updateComplete;

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');
  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
});

it('does not open on click when there are no options', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('button'));

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when disabled is set on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('button'));

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `disabled` is set programmatically on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  assert(target);

  target.disabled = true;
  await click(target);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `aria-disabled` is set on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');

  await click(target);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `aria-disabled` is set programmatically on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  const target = component.querySelector('button');
  assert(target);

  target.ariaDisabled = 'true';
  await click(target);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('opens on Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Enter when its target is a `<span>`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('span')?.focus();
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('span');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowUp' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Space when its target is a `<span>`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('span')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('span');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('does not open on Space when there are no options', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

// See the `document` click handler comment in `menu.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
    { parentNode: div },
  );

  const anotherElement = document.createElement('button');
  anotherElement.addEventListener('click', () => (component.open = true));
  div.append(anotherElement);
  await click(anotherElement);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('sets `privateSize` on the options component when `size` is changed programmatically', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.size = 'small';

  const options = component.querySelector('glide-core-menu-options');
  expect(options?.privateSize).to.equal('small');
});

it('closes when its target clicked', async () => {
  const component = await fixture<GlideCoreMenuInAnotherComponent>(
    html`<glide-core-menu-in-another-component></glide-core-menu-in-another-component>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const target = component.shadowRoot?.querySelector('button');

  const menu = component.shadowRoot?.querySelector('glide-core-menu');

  const defaultSlot =
    menu?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = menu?.querySelector('glide-core-menu-options');

  await click(target);

  expect(menu?.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(document.body);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes on Escape', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for it to open
  await aTimeout(0);

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Escape' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('glide-core-menu-link'));

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('button')?.focus();

  await hover(component.querySelector('glide-core-menu-link'));
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Enter and its target is a `<span>', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('span')?.focus();

  await hover(component.querySelector('glide-core-menu-link'));
  await sendKeys({ press: 'Enter' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('span');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Space and its target is a `<span>`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <span slot="target">Target</span>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('span')?.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('span');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('activates the first link by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first button by default when opened via click', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  await click(component.querySelector('button'));

  const buttons = component.querySelectorAll('glide-core-menu-button');
  const options = component.querySelector('glide-core-menu-options');

  expect(buttons[0].privateActive).to.be.true;
  expect(buttons[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[0]?.id);
});

it('activates a link on hover', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  await hover(links[1]);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates a link on hover when the link is in a nested slot', async () => {
  const component = await fixture<GlideCoreNestedSlot>(html`
    <glide-core-nested-slot>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-nested-slot>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = component.querySelectorAll('glide-core-menu-link');

  const options = component.shadowRoot?.querySelector(
    'glide-core-menu-options',
  );

  await hover(links[1]);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates a button on hover', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const buttons = component.querySelectorAll('glide-core-menu-button');
  const options = component.querySelector('glide-core-menu-options');

  await hover(buttons[1]);

  expect(buttons[0].privateActive).to.be.false;
  expect(buttons[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[1].id);
});

it('activates a button on hover when the button is in a nested slot', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-nested-slot>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-nested-slot>
  `);

  // Wait for Floating UI.
  await aTimeout(0);

  const links = component.querySelectorAll('glide-core-menu-button');

  const options = component.shadowRoot?.querySelector(
    'glide-core-menu-options',
  );

  await hover(links[1]);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the next option on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the previous enabled option on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'ArrowUp' });

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the first enabled option on Home', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Home' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the first enabled option on PageUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'PageUp' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the first enabled option on Meta + ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the last enabled option on End', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'End' });

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the last enabled option on PageDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'PageDown' });

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the last enabled option on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  component.querySelector('button')?.focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(links[2].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('sets `aria-activedescendant` on open', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('button'));

  const link = component.querySelector('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

it('sets `aria-activedescendant` on close', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('button'));

  const options = component.querySelector('glide-core-menu-options');
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
});

it('sets `aria-expanded` on open', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  await click(component.querySelector('button'));

  const target = component.querySelector('button');
  expect(target?.getAttribute('aria-expanded')).to.equal('true');
});

it('sets `aria-expanded` on close', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('button'));

  const target = component.querySelector('button');
  expect(target?.getAttribute('aria-expanded')).to.equal('false');
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const link = component.querySelector('glide-core-menu-link');
  expect(link?.privateActive).to.be.true;
});

it('does not wrap on Meta + ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const link = component.querySelector('glide-core-menu-link');
  expect(link?.privateActive).to.be.true;
});

it('does not wrap on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  component.querySelector('button')?.focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });

  const option = component.querySelector<GlideCoreMenuLink>(
    'glide-core-menu-link:last-of-type',
  );

  expect(option?.privateActive).to.be.true;
});

it('sets the first enabled option as active when optionless and options are dynamically added', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  component.querySelector('glide-core-menu-options')?.append(firstOption);
  component.querySelector('glide-core-menu-options')?.append(secondOption);
  component.querySelector('glide-core-menu-options')?.append(thirdOption);
  await component.updateComplete;

  expect(firstOption?.privateActive).to.be.false;
  expect(secondOption?.privateActive).to.be.true;
  expect(thirdOption?.privateActive).to.be.false;
});

it('sets the next enabled option as active when current option is programmatically disabled', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const links = component.querySelectorAll('glide-core-menu-link');
  links[0].disabled = true;

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
});

it('sets the previous enabled option as active when current option is programmatically disabled', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  const buttons = component.querySelectorAll('glide-core-menu-button');

  await hover(buttons[1]);
  buttons[1].disabled = true;

  expect(buttons[0].privateActive).to.be.true;
  expect(buttons[1].privateActive).to.be.false;
  expect(buttons[2].privateActive).to.be.false;
});

it('retains its active option when an option is dynamically added', async () => {
  const component = await fixture<GlideCoreMenu>(html`
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

  await hover(component.querySelector('glide-core-menu-button:last-of-type'));

  const button = document.createElement('glide-core-menu-button');
  button.label = 'Three';

  component.querySelector('glide-core-menu-options')?.append(button);
  await component.updateComplete;

  const options = component.querySelectorAll('glide-core-menu-button');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('has `set offset()` coverage', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.offset = 10;
});
