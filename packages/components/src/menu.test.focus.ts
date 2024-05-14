import './menu.js';
import './menu.link.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import type CsMenu from './menu.js';

it('focuses the target on `focus()`', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  component.focus();

  const target = component.querySelector('button');
  expect(target).to.not.be.null;
  expect(document.activeElement).to.equal(target);
});

it('focuses the active option on open via click', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>`,
  );

  component.querySelector('button')?.click();

  // Wait for the menu to open.
  await elementUpdated(component);

  expect(document.activeElement).to.equal(
    component.querySelector('cs-menu-link'),
  );
});

it('focuses the active option on open via Space', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>`,
  );

  component
    .querySelector('button')
    ?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  // Wait for the menu to open.
  await elementUpdated(component);

  expect(document.activeElement).to.equal(
    component.querySelector('cs-menu-link'),
  );
});

it('focuses the target on close via click', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');
  button?.click();
  expect(document.activeElement).to.equal(button);
});

it('focuses the target on close via Escape', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');

  button?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  );

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via click', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu open>
      <button slot="target">Target</button>

      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');

  button?.click();
  const menuLink = component.querySelector('cs-menu-link');
  menuLink?.click();

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Enter', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');

  button?.click();

  component
    .querySelector('cs-menu-link')
    ?.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Space', async () => {
  const component = await fixture<CsMenu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = component.querySelector('button');
  button?.click();

  component
    .querySelector('cs-menu-link')
    ?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  expect(document.activeElement).to.equal(button);
});
