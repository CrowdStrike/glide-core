import './option.js';
import './options.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Menu from './menu.js';

it('closes when it loses focus', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await sendKeys({ press: 'Tab' });

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = host.querySelector('glide-core-options');

  expect(host.open).to.be.false;
  expect(defaultSlot?.checkVisibility()).be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('remains open when Options is focused programatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelector('glide-core-options');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  options?.focus();
  await aTimeout(0); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('remains open when an option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  host.querySelector('glide-core-option')?.focus();
  await aTimeout(0); // Wait for Floating UI

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
});

it('sets an inactive option as active when the option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-option');

  options[1]?.focus();
  await host.updateComplete;

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[1]?.id);
});
