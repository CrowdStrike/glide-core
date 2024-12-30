/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';
import click from './library/click.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-input')).to.equal(
    GlideCoreInput,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" value="lorem"></glide-core-input>
  `);

  await expect(component).to.be.accessible();
});

it('accepts and contains "value" attribute', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" value="lorem"></glide-core-input>
  `);

  expect(component.value).to.equal('lorem');
});

it('accepts disable attribute and disables the underlying input', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" disabled></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('disabled')).to.be.true;
});

it('accepts readonly attribute and applies readonly to the underlying input', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" readonly></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('readonly')).to.be.true;
});

it('accepts a type attribute', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" type="number"></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('number');
});

it('changes to type text when password is revealed', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="password123"
      type="password"
      password-toggle
    ></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('password');

  await click(
    component.shadowRoot?.querySelector('[data-test="password-toggle"]'),
  );

  expect(inputElement?.getAttribute('type')).to.equal('text');
});

it('shows search icon with type search', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" type="search"></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('search');

  const searchIcon = component.shadowRoot?.querySelector(
    '[data-test="search-icon"]',
  );

  expect(searchIcon).to.exist;
});

it('when using "focus() on input", the native input is focused', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test"></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  component.focus();

  expect(document.activeElement).to.equal(component);
  expect(component.shadowRoot?.activeElement).to.equal(inputElement);
});

it('emits input events when text is changed and reports a value through the event target', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test"></glide-core-input>
  `);

  let inputEventCaught = false;
  let value = '';

  component.addEventListener('input', (event: Event) => {
    inputEventCaught = true;

    if (event.target instanceof GlideCoreInput) {
      value = event.target.value;
    }
  });

  component.focus();

  await sendKeys({ type: 'testing' });

  component.blur();

  expect(inputEventCaught).to.be.true;
  expect(value).to.be.equal('testing');
});

it('clearable attribute allows for a button which can clear input', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" clearable></glide-core-input>
  `);

  const clearButton = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  component.focus();

  await sendKeys({ type: 'testing' });

  expect(component.value).to.be.equal('testing');

  await click(clearButton);

  expect(component.value).to.be.equal('');
});

it('label correctly displays when provided as an attribute', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label"></glide-core-input>
  `);

  const labelElement = component?.shadowRoot?.querySelector('label');

  const labelText = labelElement?.textContent?.trim();

  expect(labelText).to.be.equal('Test label');
});

it('displays a max character and current character count if maxlength is provided', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const maxCharacterCountText = component.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.equal('0/5');
});

it('displays visually hidden character count text for screenreaders', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const maxCharacterCountAnnouncement = component.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal(
    'Character count 0 of 5',
  );
});

it('does not render a character count when attribute `maxlength` is set less than than zero', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="0"></glide-core-input>
  `);

  const container = component.shadowRoot?.querySelector(
    '[data-test="character-count-container"]',
  );

  expect(container).to.be.null;
});
