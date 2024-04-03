import './link.component.js';
import './menu.component.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type Menu from './menu.js';

it('opens when clicked', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  expect(menu.open).to.be.true;
});

it('opens on Enter', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(menu.open).to.be.true;
});

it('opens on ArrowUp', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowUp' });

  expect(menu.open).to.be.true;
});

it('opens on ArrowDown', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(menu.open).to.be.true;
});

it('opens on Space', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.focus();
  await sendKeys({ press: ' ' });

  expect(menu.open).to.be.true;
});

// See the `document` click listener comment in `menu.component.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
    { parentNode: div }
  );

  const button = document.createElement('button');
  button.addEventListener('click', () => (menu.open = true));
  div.append(button);
  button.click();

  expect(menu.open).to.be.true;
});

it('closes when clicked', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  expect(menu.open).to.be.false;
});

it('closes when something outside of it is clicked', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  document.body.click();
  expect(menu.open).to.be.false;
});

it('closes on Escape when the button has focus', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  await sendKeys({ press: 'Escape' });

  expect(menu.open).to.be.false;
});

it('closes on Escape when an option has focus', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();

  menu.querySelector('cs-menu-link')?.focus();
  await sendKeys({ press: 'Escape' });

  expect(menu.open).to.be.false;
});

it('closes when an option is selected via click', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  menu.querySelector('cs-menu-link')?.click();

  expect(menu.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('cs-menu-link')?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'Enter' });

  expect(menu.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();

  menu.querySelector('cs-menu-link')?.focus();
  await sendKeys({ press: ' ' });

  expect(menu.open).to.be.false;
});

it('activates an option on "mouseover"', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  const options = menu.querySelectorAll('cs-menu-link');
  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates the first option by default', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  const options = menu.querySelectorAll('cs-menu-link');

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the next option on ArrowDown', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates the previous option on ArrowUp', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the first option on Home', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'Home' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the first option on PageUp', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the first option on ArrowUp + Meta', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');
  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the last option on End', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[0].focus();
  await sendKeys({ press: 'End' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates the last option on PageDown', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates the last option on Meta + ArrowDown', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('sets `aria-expanded` on open', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();
  expect(menu.querySelector('button')?.getAttribute('aria-expanded')).to.equal('true');
});

it('sets `aria-expanded` on close', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();

  expect(menu.querySelector('button')?.getAttribute('aria-expanded')).to.equal('false');
});

it('does not wrap on ArrowUp', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();
  await sendKeys({ press: 'ArrowUp' });

  expect(menu.querySelector('cs-menu-link')?.privateActive).to.be.true;
});

it('does not wrap on ArrowDown', async () => {
  const menu = await fixture<Menu>(html`
    <cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>
  `);

  menu.querySelector('button')?.click();

  const options = menu.querySelectorAll('cs-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[1].privateActive).to.be.true;
});
