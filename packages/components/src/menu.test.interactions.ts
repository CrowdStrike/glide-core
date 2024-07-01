import './menu.link.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreMenu from './menu.js';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('opens when clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
});

it('does not open when clicked when its target is `disabled`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.not.be.ok;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when clicked when its target is `aria-disabled`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.not.be.ok;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('opens on Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowUp' });

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens on Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.open = true;
  await elementUpdated(component);

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('does not open when opened programmatically and its target is `disabled`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target" disabled>Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.open = true;
  await elementUpdated(component);

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.not.be.ok;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('does not open when opened programmatically and its target is `aria-disabled`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button aria-disabled="true" slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.open = true;
  await elementUpdated(component);

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.not.be.ok;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

// See the `document` click listener comment in `menu.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
    { parentNode: div },
  );

  const anotherElement = document.createElement('button');
  anotherElement.addEventListener('click', () => (component.open = true));
  div.append(anotherElement);
  anotherElement.click();
  await elementUpdated(component);

  const menu = component.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');
  const link = component.querySelector('glide-core-menu-link');

  expect(component.open).to.be.true;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(link?.id);
  expect(target?.ariaExpanded).to.equal('true');
});

it('closes when clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.checkVisibility({ checkVisibilityCSS: true })).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  document.body.click();

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes on Escape when the button has focus', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await sendKeys({ press: 'Escape' });

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('glide-core-menu-link')?.click();
  await elementUpdated(component);

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.focus();

  component
    .querySelector('glide-core-menu-link')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ press: 'Enter' });
  await elementUpdated(component);

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  const target = component.querySelector('button');

  expect(component.open).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
  expect(target?.ariaExpanded).to.equal('false');
});

it('activates the first menu link by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates the first menu button by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const options = component.querySelectorAll('glide-core-menu-button');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates a menu link on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('activates a menu button on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-button');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('activates the next option on ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
      <glide-core-menu-link label="Three"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.false;
  expect(options[2].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[2].id);
});

it('activates the previous option on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates the first option on Home', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'Home' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates the first option on PageUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates the first option on ArrowUp + Meta', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('activates the last option on End', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  await sendKeys({ press: 'End' });

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('activates the last option on PageDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('activates the last option on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();
  component.focus();

  const options = component.querySelectorAll('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
  expect(menu?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('sets `aria-activedescendant` on open', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const option = component.querySelector('glide-core-menu-link');
  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');

  expect(menu?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on close', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  await elementUpdated(component);

  const menu = component?.shadowRoot?.querySelector('[data-test="menu"]');
  expect(menu?.getAttribute('aria-activedescendant')).to.equal('');
});

it('sets `aria-expanded` on open', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  expect(
    component.querySelector('button')?.getAttribute('aria-expanded'),
  ).to.equal('true');
});

it('sets `aria-expanded` on close', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  expect(
    component.querySelector('button')?.getAttribute('aria-expanded'),
  ).to.equal('false');
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
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
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  component.querySelector('button')?.click();

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[1].privateActive).to.be.true;
});
