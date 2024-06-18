import './menu.js';
import './menu.link.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type GlideCoreMenu from './menu.js';

it('opens when clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  expect(component.open).to.be.true;
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

  expect(component.open).to.be.true;
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

  expect(component.open).to.be.true;
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

  expect(component.open).to.be.true;
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

  expect(component.open).to.be.true;
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

  const button = document.createElement('button');
  button.addEventListener('click', () => (component.open = true));
  div.append(button);
  button.click();

  expect(component.open).to.be.true;
});

it('closes when clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  expect(component.open).to.be.false;
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
  expect(component.open).to.be.false;
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

  expect(component.open).to.be.false;
});

it('closes on Escape when an option has focus', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const menuLink = component.querySelector('glide-core-menu-link');
  menuLink?.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();
  const menuLink = component.querySelector('glide-core-menu-link');
  menuLink?.click();

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component
    .querySelector('glide-core-menu-link')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  const menuLink = component.querySelector('glide-core-menu-link');
  menuLink?.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('activates an option on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-link');
  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates a menu button option on "mouseover"', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-button');
  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
});

it('activates the first option by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-link');

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
});

it('activates the first menu-button option by default', async () => {
  const component = await fixture<GlideCoreMenu>(html`
    <glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
    </glide-core-menu>
  `);

  const options = component.querySelectorAll('glide-core-menu-button');

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.false;
  expect(options[2].privateActive).to.be.true;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'Home' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageUp' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
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

  const options = component.querySelectorAll('glide-core-menu-link');
  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0].privateActive).to.be.true;
  expect(options[1].privateActive).to.be.false;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[0].focus();
  await sendKeys({ press: 'End' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ press: 'PageDown' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
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

  const options = component.querySelectorAll('glide-core-menu-link');

  options[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0].privateActive).to.be.false;
  expect(options[1].privateActive).to.be.true;
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
  const menuLink = component.querySelector('glide-core-menu-link');
  expect(menuLink?.privateActive).to.be.true;
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
