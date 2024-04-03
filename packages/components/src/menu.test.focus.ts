import './link.component.js';
import './menu.component.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import type Menu from './menu.js';

it('focuses the target on `focus()`', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  menu.focus();

  const target = menu.querySelector('button');
  expect(target).to.not.be.null;
  expect(document.activeElement).to.equal(target);
});

it('focuses the active option on open via click', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.click();

  // Wait for the menu to open.
  await elementUpdated(menu);

  expect(document.activeElement).to.equal(menu.querySelector('cs-menu-link'));
});

it('focuses the active option on open via Space', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="One"></cs-menu-link>
      <cs-menu-link label="Two"></cs-menu-link>
    </cs-menu>`
  );

  menu.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  // Wait for the menu to open.
  await elementUpdated(menu);

  expect(document.activeElement).to.equal(menu.querySelector('cs-menu-link'));
});

it('focuses the target on close via click', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  const button = menu.querySelector('button');
  button?.click();
  expect(document.activeElement).to.equal(button);
});

it('focuses the target on close via Escape', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  const button = menu.querySelector('button');
  button?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via click', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu" open>
      <button slot="target">Target</button>

      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  const button = menu.querySelector('button');

  button?.click();
  menu.querySelector('cs-menu-link')?.click();

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Enter', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  const button = menu.querySelector('button');

  button?.click();
  menu.querySelector('cs-menu-link')?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Space', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`
  );

  const button = menu.querySelector('button');
  button?.click();
  menu.querySelector('cs-menu-link')?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  expect(document.activeElement).to.equal(button);
});
