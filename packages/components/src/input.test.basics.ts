import './input.component.js';
import '@crowdstrike/glide-icons/editor/pencil-line/line.js';
import { clickOnElement } from '../utils/test.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import InputClass from './input.component.js';
import type Input from './input.component.js';

it('accepts and contains "value" attribute', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test" value="lorem"></cs-input>
  `);

  expect(element.value).to.equal('lorem');
});

it('accepts disable attribute and disables the underlying input', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test" disabled></cs-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('disabled')).to.be.true;
});

it('accepts readonly attribute and applies readonly to the underlying input', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test" readonly></cs-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  expect(inputElement).to.exist;
  expect(inputElement?.hasAttribute('readonly')).to.be.true;
});

it('when using "focus() on input", the native input is focused', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test"></cs-input>
  `);

  const inputElement =
    element.shadowRoot?.querySelector<HTMLInputElement>('input');

  element.focus();

  expect(document.activeElement).to.equal(element);
  expect(element.shadowRoot?.activeElement).to.equal(inputElement);
});

it('emits input events when text is changed and reports a value through the event target', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test"></cs-input>
  `);

  let inputEventCaught = false;
  let value = '';
  element.addEventListener('input', (event: Event) => {
    inputEventCaught = true;
    if (event.target instanceof InputClass) {
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
  const element = await fixture<Input>(html`
    <cs-input label="Test" clearable></cs-input>
  `);
  const clearButton =
    element.shadowRoot?.querySelector<HTMLButtonElement>('.clear-icon-button');

  element.focus();

  await sendKeys({ type: 'testing' });

  expect(element.value).to.be.equal('testing');

  await clickOnElement(clearButton);

  expect(element.value).to.be.equal('');
});

it('label correctly displays when provided as an attribute', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test label"></cs-input>
  `);

  const labelElement = element?.shadowRoot?.querySelector('label');

  const labelText = labelElement?.textContent?.trim();

  expect(labelText).to.be.equal('Test label');
});

it('displays a max character and current character count if max-character-count is provided', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test label" max-character-count="5"></cs-input>
  `);

  const maxCharacterCountContainer =
    element.shadowRoot?.querySelector<HTMLDivElement>('.meta__character-count');

  expect(maxCharacterCountContainer?.textContent?.trim()).to.be.equal('0/5');
});

it('max content input receives error styling when text count is greater than max character count', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test label" max-character-count="5"></cs-input>
  `);

  const componentContainer =
    element.shadowRoot?.querySelector<HTMLDivElement>('.component');
  const maxCharacterCountContainer =
    element.shadowRoot?.querySelector<HTMLDivElement>('.meta__character-count');

  expect(componentContainer?.classList.contains('component--error')).to.be
    .false;

  element.focus();

  await sendKeys({ type: 'testing' });

  expect(maxCharacterCountContainer?.textContent?.trim()).to.be.equal('7/5');
  expect(componentContainer?.classList.contains('component--error')).to.be.true;
});

it('supports a "description" slot', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test">
      <div slot="description">Description</div>
    </cs-input>
  `);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('supports a "prefix" icon slot', async () => {
  const element = await fixture<Input>(html`
    <cs-input label="Test">
      <div slot="prefix">
        <span data-svg></span>
      </div>
    </cs-input>
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
  const element = await fixture<Input>(html`
    <cs-input label="Test">
      <div slot="suffix">
        <span data-svg></span>
      </div>
    </cs-input>
  `);

  const assignedElements = element.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="suffix"]')
    ?.assignedElements();

  const slottedSvg = assignedElements
    ?.at(0)
    ?.querySelector<HTMLSpanElement>('[data-svg]');

  expect(slottedSvg).to.exist;
});
