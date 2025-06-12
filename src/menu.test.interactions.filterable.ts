import './options.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import './input.js';

it('opens on input', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input
        label="Label"
        slot="target"
        hide-label
      ></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('opens on Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input
        label="Label"
        slot="target"
        hide-label
      ></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  const input = host
    .querySelector('glide-core-input')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: ' ' });

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(input?.value).to.be.empty.string;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when its target is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input
        label="Label"
        slot="target"
        hide-label
      ></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');

  const defaultSlot =
    host.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const option = host.querySelector('glide-core-option');

  await aTimeout(0);
  await click(target);

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});
