/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-input')).to.equal(
    GlideCoreInput,
  );
});

it('is accessible', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" value="lorem"></glide-core-input>
  `);

  await expect(element).to.be.accessible();
});

it('accepts and contains "value" attribute', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" value="lorem"></glide-core-input>
  `);

  expect(element.value).to.equal('lorem');
});

it('accepts disable attribute and disables the underlying input', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" disabled></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('disabled')).to.be.true;
});

it('accepts readonly attribute and applies readonly to the underlying input', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" readonly></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('readonly')).to.be.true;
});

it('accepts a type attribute', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" type="number"></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('number');
});

it('changes to type text when password is revealed', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="password123"
      type="password"
      password-toggle
    ></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('password');

  const passwordToggle = element.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="password-toggle"]',
  );

  passwordToggle?.click();
  await element.updateComplete;

  expect(inputElement?.getAttribute('type')).to.equal('text');
});

it('shows search icon with type search', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" type="search"></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.getAttribute('type')).to.equal('search');

  const searchIcon = element.shadowRoot?.querySelector(
    '[data-test="search-icon"]',
  );

  expect(searchIcon).to.exist;
});

it('when using "focus() on input", the native input is focused', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test"></glide-core-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  element.focus();

  expect(document.activeElement).to.equal(element);
  expect(element.shadowRoot?.activeElement).to.equal(inputElement);
});

it('emits input events when text is changed and reports a value through the event target', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test"></glide-core-input>
  `);

  let inputEventCaught = false;
  let value = '';

  element.addEventListener('input', (event: Event) => {
    inputEventCaught = true;

    if (event.target instanceof GlideCoreInput) {
      value = event.target.value;
    }
  });

  element.focus();

  await sendKeys({ type: 'testing' });

  element.blur();

  expect(inputEventCaught).to.be.true;
  expect(value).to.be.equal('testing');
});

it('clearable attribute allows for a button which can clear input', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test" clearable></glide-core-input>
  `);

  const clearButton = element.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  element.focus();

  await sendKeys({ type: 'testing' });

  expect(element.value).to.be.equal('testing');

  clearButton?.click();

  expect(element.value).to.be.equal('');
});

it('label correctly displays when provided as an attribute', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label"></glide-core-input>
  `);

  const labelElement = element?.shadowRoot?.querySelector('label');

  const labelText = labelElement?.textContent?.trim();

  expect(labelText).to.be.equal('Test label');
});

it('displays a max character and current character count if maxlength is provided', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const maxCharacterCountText = element.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.be.equal('0/5');
});

it('displays visually hidden character count text for screenreaders', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const maxCharacterCountAnnouncement = element.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.be.equal(
    'Character count 0 of 5',
  );
});

it('does not render a character count when attribute `maxlength` is set less than than zero', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="0"></glide-core-input>
  `);

  const container = element.shadowRoot?.querySelector(
    '[data-test="character-count-container"]',
  );

  expect(container).to.be.null;
});

it('supports a "tooltip" slot', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="test">
      <div slot="tooltip">Tooltip</div>
    </glide-core-input>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('supports a "description" slot', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test">
      <div slot="description">Description</div>
    </glide-core-input>
  `);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('supports a "prefix" icon slot', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test">
      <div slot="prefix">
        <span data-svg></span>
      </div>
    </glide-core-input>
  `);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="prefix"]')
    ?.assignedElements();

  const slottedSvg = assignedElements
    ?.at(0)
    ?.querySelector<HTMLSpanElement>('[data-svg]');

  expect(slottedSvg).to.exist;
});

it('supports a "suffix" icon slot', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test">
      <div slot="suffix">
        <span data-svg></span>
      </div>
    </glide-core-input>
  `);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="suffix"]')
    ?.assignedElements();

  const slottedSvg = assignedElements
    ?.at(0)
    ?.querySelector<HTMLSpanElement>('[data-svg]');

  expect(slottedSvg).to.exist;
});
