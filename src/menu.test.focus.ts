/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.link.js';
import './menu.options.js';
import {
  aTimeout,
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreMenu from './menu.js';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('focuses the target on `focus()`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();

  const target = component.querySelector('button');
  assert(target);

  expect(document.activeElement).to.equal(target);
});

it('closes when it loses focus', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();
  await sendKeys({ press: 'Tab' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
});

it('remains open when the options component is focused', async () => {
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

  component.focus();

  const options = component.querySelector('glide-core-menu-options');

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  options?.focus();

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('remains open when an option is focused', async () => {
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

  component.focus();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = component.querySelector('glide-core-menu-link');

  assert(option);
  option?.focus();

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('sets an inactive option as active when focused', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();

  const button = component.querySelector('glide-core-menu-button');
  const link = component.querySelector('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  link?.focus();
  await elementUpdated(component);

  expect(link?.privateActive).to.be.true;
  expect(button?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

// Kind of an odd test. There's a comment in `#onDefaultSlotFocusin` that
// explains it.
it('sets an already active option as active when focused', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();

  const button = component.querySelector('glide-core-menu-button');
  const link = component.querySelector('glide-core-menu-link');
  const options = component.querySelector('glide-core-menu-options');

  button?.focus();
  await elementUpdated(component);

  expect(button?.privateActive).to.be.true;
  expect(link?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(button?.id);
});
