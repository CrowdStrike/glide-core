import './menu.js';
import './menu.link.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import type GlideCoreMenu from './menu.js';

it('focuses the target on `focus()`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.focus();

  const target = component.querySelector('button');
  expect(target).to.not.be.null;
  expect(document.activeElement).to.equal(target);
});

it('focuses the active option on open via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component.querySelector('button')?.click();

  // Wait for the menu to open.
  await elementUpdated(component);

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-menu-link'),
  );
});

it('focuses the active option on open via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="One"></glide-core-menu-link>
      <glide-core-menu-link label="Two"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  component
    .querySelector('button')
    ?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  // Wait for the menu to open.
  await elementUpdated(component);

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-menu-link'),
  );
});

it('focuses the target on close via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  const button = component.querySelector('button');
  button?.click();
  expect(document.activeElement).to.equal(button);
});

it('focuses the target on close via Escape', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  const button = component.querySelector('button');

  button?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  );

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  const button = component.querySelector('button');

  button?.click();
  const menuLink = component.querySelector('glide-core-menu-link');
  menuLink?.click();

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  const button = component.querySelector('button');

  button?.click();

  component
    .querySelector('glide-core-menu-link')
    ?.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }),
    );

  expect(document.activeElement).to.equal(button);
});

it('focuses the target when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>
      <glide-core-menu-link label="Link"></glide-core-menu-link>
    </glide-core-menu>`,
  );

  const button = component.querySelector('button');
  button?.click();

  component
    .querySelector('glide-core-menu-link')
    ?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));

  expect(document.activeElement).to.equal(button);
});
