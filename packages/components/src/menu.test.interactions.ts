import './menu.link.js';
import './menu.options.js';
import { LitElement } from 'lit';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreMenu from './menu.js';

@customElement('glide-core-nested-slot')
class GlideCoreNestedSlot extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  override render() {
    return html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <slot></slot>
      </glide-core-menu-options>
    </glide-core-menu>`;
  }
}

GlideCoreMenu.shadowRootOptions.mode = 'open';
GlideCoreNestedSlot.shadowRootOptions.mode = 'open';

it('opens on click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = component.querySelector('button');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
});

it('does not open on click when there are no options', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-options> </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.not.ok;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when `disabled` is set on its target', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  target.click();
  target.disabled = true;
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  target?.click();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  const button = component.querySelector('button');
  assert(button);

  button?.click();
  button.ariaDisabled = 'true';
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
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
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
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
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
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
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
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
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.not.ok;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
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
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

// See the `document` click listener comment in `menu.ts` for an explanation.
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
  anotherElement.click();
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
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

it('closes when clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  document.body.click();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes on Escape when the button has focus', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await sendKeys({ press: 'Escape' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  component.querySelector('glide-core-menu-link')?.click();
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  component.focus();

  component
    .querySelector('glide-core-menu-link')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ press: 'Enter' });
  await elementUpdated(component);

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
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

  component.focus();
  await sendKeys({ press: ' ' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).not.ok;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('activates the first menu link by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0]?.id);
});

it('activates the first menu button by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const buttons = component.querySelectorAll('glide-core-menu-button');
  const options = component.querySelector('glide-core-menu-options');

  expect(buttons[0].privateActive).to.be.true;
  expect(buttons[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[0]?.id);
});

it('activates a menu link on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates a menu link on "mouseover" when the link is in a nested slot', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-nested-slot>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-nested-slot>
  `);

  const links = component.querySelectorAll('glide-core-menu-link');

  const options = component.shadowRoot?.querySelector(
    'glide-core-menu-options',
  );

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates a menu button on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="One"></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  const buttons = component.querySelectorAll('glide-core-menu-button');
  const options = component.querySelector('glide-core-menu-options');

  buttons[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(buttons[0].privateActive).to.be.false;
  expect(buttons[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).equal(buttons[1].id);
});

it('activates a menu button on "mouseover" when the button is in a nested slot', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-nested-slot>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-nested-slot>
  `);

  const links = component.querySelectorAll('glide-core-menu-button');

  const options = component.shadowRoot?.querySelector(
    'glide-core-menu-options',
  );

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the next option on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
        <glide-core-menu-link label="Three"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.false;
  expect(links[2].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[2].id);
});

it('activates the previous option on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowUp' });

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the first option on Home', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'Home' });

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the first option on PageUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageUp' });

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the first option on ArrowUp + Meta', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });

  expect(links[0].privateActive).to.be.true;
  expect(links[1].privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[0].id);
});

it('activates the last option on End', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  await sendKeys({ press: 'End' });

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the last option on PageDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageDown' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(links[1].id);
});

it('activates the last option on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const links = component.querySelectorAll('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  links[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(links[0].privateActive).to.be.false;
  expect(links[1].privateActive).to.be.true;
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

  component.querySelector('button')?.click();
  await elementUpdated(component);

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

  component.querySelector('button')?.click();
  await elementUpdated(component);

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

  component.querySelector('button')?.click();

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-expanded')).to.equal('true');
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

  component.querySelector('button')?.click();

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-expanded')).to.equal('false');
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  await sendKeys({ press: 'ArrowUp' });

  const link = component.querySelector('glide-core-menu-link');
  expect(link?.privateActive).to.be.true;
});

it('does not wrap on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="One"></glide-core-menu-link>
        <glide-core-menu-link label="Two"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[1].privateActive).to.be.true;
});
