import './option.js';
import './options.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Menu from './menu.js';
import requestIdleCallback from '@/src/library/request-idle-callback.js';

it('closes when it loses focus', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await sendKeys({ press: 'Tab' });

  expect(host.open).to.be.false;
  expect(target?.ariaExpanded).to.equal('false');
  expect(defaultSlot?.checkVisibility()).be.false;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
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

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  host.querySelector('glide-core-options')?.focus();
  await requestIdleCallback(); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when an Option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  options[0]?.focus();
  await requestIdleCallback(); // Wait for Floating UI

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('remains open when arbitrary content in its default slot is focused via keyboard', async () => {
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
  const options = host.querySelectorAll('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // Target
  await sendKeys({ press: 'Tab' }); // Button

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(options[0]?.id);
});

it('sets an Option as active when the Option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI
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

it('focuses its target on Enter after an Option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Space after an Option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Escape after an Option is focused programmatically', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('button');
  const options = host.querySelectorAll('glide-core-option');

  await requestIdleCallback(); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(target);
});

it('focuses its target on Escape after arbitrary content in its default slot is focused', async () => {
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

it('focuses the parent Option of a sub-Menu on Escape after a sub-Menu Option was focused programmatically', async () => {
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

  await requestIdleCallback(); // Wait for Floating UI
  options[1]?.focus();
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(options[0]);
});
