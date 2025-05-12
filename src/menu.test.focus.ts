import './menu.link.js';
import './menu.options.js';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreMenu from './menu.js';

it('closes when it loses focus', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  host.querySelector('button')?.focus();
  await sendKeys({ press: 'Tab' });

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-menu-options');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('remains open when the options host is focused', async () => {
  const host = await fixture<GlideCoreMenu>(
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

  const options = host.querySelector('glide-core-menu-options');

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  options?.focus();

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('remains open when an option is focused', async () => {
  const host = await fixture<GlideCoreMenu>(
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

  const defaultSlot =
    host?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-menu-link');

  assert(option);
  option?.focus();

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('sets an inactive option as active when focused', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();

  const button = host.querySelector('glide-core-menu-button');
  const link = host.querySelector('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  link?.focus();
  await host.updateComplete;

  expect(link?.privateActive).to.be.true;
  expect(button?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});

// Kind of an odd test. There's a comment in `#onDefaultSlotFocusin` that
// explains it.
it('sets an already active option as active when focused', async () => {
  const host = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.querySelector('button')?.focus();

  const button = host.querySelector('glide-core-menu-button');
  const link = host.querySelector('glide-core-menu-link');
  const options = host.querySelector('glide-core-menu-options');

  button?.focus();
  await host.updateComplete;

  expect(button?.privateActive).to.be.true;
  expect(link?.privateActive).to.be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(button?.id);
});
