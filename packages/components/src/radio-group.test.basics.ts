import './radio-group.js';
import './radio.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';
// import sinon from 'sinon';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-radio-group')).to.equal(CsRadioGroup);
  expect(window.customElements.get('cs-radio')).to.equal(CsRadio);
});

it('is accessible', async () => {
  const element = await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2">Option 2</cs-radio>
      <cs-radio value="value-3">Option 3</cs-radio>
      <span slot="tooltip">Tooltip</span>
      <div slot="description">Description</div>
    </cs-radio-group>
  `);

  await expect(element).to.be.accessible();
});

it('renders appropriate attributes on cs-radio', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');
  expect(radio).to.have.attribute('value', 'value-1');
  expect(radio).to.have.attribute('tabindex', '0');
  expect(radio).to.have.attribute('checked');
  expect(radio).to.have.attribute('role', 'radio');
  expect(radio).to.have.attribute('aria-checked', 'true');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio).to.have.attribute('aria-invalid', 'false');
  expect(radio).to.have.attribute('aria-required', 'false');
});

it('renders a label, radio group, description, and tooltip when given', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
      <span slot="tooltip" data-tooltip>Tooltip</span>
      <div slot="description" data-description>Description</div>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');
  const label = group?.shadowRoot?.querySelector('[data-test="label"]');
  const radioGroup = group?.shadowRoot?.querySelector('[role="radiogroup"]');
  const tooltipSlot = group?.shadowRoot?.querySelector('cs-tooltip');
  const tooltip = document.querySelector('[data-tooltip]');

  const descriptionSlot = group?.shadowRoot?.querySelector(
    '[data-test="description"]',
  );

  const description = document.querySelector('[data-description]');

  expect(group).to.not.be.null;
  expect(label).to.not.be.null;
  expect(radioGroup).to.not.be.null;
  expect(tooltipSlot).to.not.be.null;
  expect(tooltip).to.not.be.null;
  expect(descriptionSlot).to.not.be.null;
  expect(description).to.not.be.null;
});

it('does not render a "label" when not given', async () => {
  await fixture(html`
    <cs-radio-group name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');
  const label = group?.shadowRoot?.querySelector('[data-test="label"]');

  expect(group).to.not.be.null;
  expect(label).to.be.null;
});

it('does not render a description when not given', async () => {
  await fixture(html`
    <cs-radio-group name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const description = group?.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="description"]',
  );

  expect(group).to.not.be.null;
  expect(description?.assignedNodes().length).to.equal(0);
});

it('does not render a tooltip when no "label" is given', async () => {
  await fixture(html`
    <cs-radio-group name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const tooltip = group?.shadowRoot?.querySelector('cs-tooltip');

  expect(tooltip).to.be.null;
});

it('renders a required symbol when a "label" is given and "required" is set', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" required>
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const requiredSymbol = group?.shadowRoot?.querySelector(
    '[data-test="label-required"]',
  );

  expect(requiredSymbol).to.not.be.null;
});

it('does not render a required symbol when a "label" is given and "required" is not set', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const requiredSymbol = group?.shadowRoot?.querySelector(
    '[data-test="label-required"]',
  );

  expect(requiredSymbol).to.be.null;
});

it('renders radios as "disabled" when "disabled" is set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" disabled>
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');

  expect(radio).to.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'true');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.not.null;
});

it('does not render radios as "disabled" when "disabled" is not set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('sets the "name" property on radios when set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" disabled>
      <cs-radio value="value-1">Option 1</cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');

  expect(radio?.name).to.equal('name');
});

it('sets the radio with the given "value" as "checked"', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-2">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2">Option 2</cs-radio>
    </cs-radio-group>
  `);

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(2);

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1]).to.have.attribute('checked');
});

it('sets the group "value" when a radio is set as "checked"', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2" checked>Option 2</cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  expect(group).to.have.attribute('value', 'value-2');
});
