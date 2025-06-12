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

it('remains open when arbitrary content in its default slot is focused', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>

      <button>Button</button>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const target = host.querySelector('button');

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // Target
  await sendKeys({ press: 'Tab' }); // Button

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('sets an option as active when it is focused programmatically', async () => {
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

it('focuses its target on Enter when an option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');
  const target = host.querySelector('button');

  await aTimeout(0); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Space when an option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');
  const target = host.querySelector('button');

  await aTimeout(0); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Escape when an option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');
  const target = host.querySelector('button');

  await aTimeout(0); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Escape when arbitrary content in its default slot is focused', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>

      <button>Button</button>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  await sendKeys({ press: 'Tab' }); // Target
  await sendKeys({ press: 'Tab' }); // Button
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(target);
});

it('focuses the parent option of a submenu on Escape when a submenu option was focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  options[1]?.focus();
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(options[0]);
});
