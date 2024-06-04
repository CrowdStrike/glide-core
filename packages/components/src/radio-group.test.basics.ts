import './radio-group.js';
import './radio.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';
import expectArgumentError from './library/expect-argument-error.js';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-radio-group')).to.equal(CsRadioGroup);
  expect(window.customElements.get('cs-radio')).to.equal(CsRadio);
});

it('is accessible', async () => {
  const element = await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three"></cs-radio>
      <span slot="tooltip">Tooltip</span>
      <div slot="description">Description</div>
    </cs-radio-group>
  `);

  await expect(element).to.be.accessible();
});

it('renders appropriate attributes on cs-radio', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two" checked></cs-radio>
    </cs-radio-group>
  `);

  const radios = document.querySelectorAll('cs-radio');

  expect(radios[0]).to.have.attribute('value', 'value-1');
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[0]).to.have.attribute('role', 'radio');
  expect(radios[0]).to.have.attribute('aria-checked', 'false');
  expect(radios[0]).to.have.attribute('aria-disabled', 'false');
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[0]).to.have.attribute('aria-required', 'false');

  expect(radios[1]).to.have.attribute('value', 'value-2');
  expect(radios[1]).to.have.attribute('tabindex', '0');
  expect(radios[1]).to.have.attribute('checked');
  expect(radios[1]).to.have.attribute('role', 'radio');
  expect(radios[1]).to.have.attribute('aria-checked', 'true');
  expect(radios[1]).to.have.attribute('aria-disabled', 'false');
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]).to.have.attribute('aria-required', 'false');
});

it('renders a label, radio group, description, and tooltip when given', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1" label="One"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const tooltip = group?.shadowRoot?.querySelector('cs-tooltip');

  expect(tooltip).to.be.null;
});

it('renders a required symbol when a "label" is given and "required" is set', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" required>
      <cs-radio value="value-1" label="One"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  const requiredSymbol = group?.shadowRoot?.querySelector(
    '[data-test="label-required"]',
  );

  expect(requiredSymbol).to.be.null;
});

it('sets "required" attributes on radios when "required" is set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>
  `);

  const radios = document.querySelectorAll('cs-radio');

  expect(radios[0]).to.have.attribute('required');
  expect(radios[0]).to.have.attribute('aria-required', 'true');
  expect(radios[1]).to.have.attribute('required');
  expect(radios[1]).to.have.attribute('aria-required', 'true');
});

it('does not set "required" attributes on radios when "required" is not set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>
  `);

  const radios = document.querySelectorAll('cs-radio');

  expect(radios[0]).to.not.have.attribute('required');
  expect(radios[0]).to.have.attribute('aria-required', 'false');
  expect(radios[1]).to.not.have.attribute('required');
  expect(radios[1]).to.have.attribute('aria-required', 'false');
});

it('renders radios as "disabled" when "disabled" is set on the group', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name" value="value-1" disabled>
      <cs-radio value="value-1" label="One"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('renders radios as "disabled" when "disabled" is dynamically set and removed on the group', async () => {
  const component = await fixture<CsRadioGroup>(html`
    <cs-radio-group label="label" name="name" value="value-1">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>
  `);

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.null;

  component.disabled = true;
  await elementUpdated(component);

  expect(radio).to.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'true');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.not.null;

  component.disabled = false;
  await elementUpdated(component);

  expect(radio).to.not.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('sets the radio group to an empty value when no radio is "checked"', async () => {
  const component = await fixture<CsRadioGroup>(html`
    <cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>
  `);

  const radios = document.querySelectorAll('cs-radio');

  expect(component.value).to.equal('');
  expect(radios.length).to.equal(2);

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[0]).to.have.attribute('aria-checked', 'false');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[1]).to.have.attribute('aria-checked', 'false');
});

it('sets the group "value" when a radio is set as "checked"', async () => {
  await fixture(html`
    <cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>
  `);

  const group = document.querySelector('cs-radio-group');

  expect(group).to.have.attribute('value', 'value-2');
});

it('throws an error when an element other than `cs-radio` is a child of the default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <cs-radio-group label="label" name="name">
        <div>Option 1</div>
        <cs-radio value="value-2" label="Two"></cs-radio>
      </cs-radio-group>
    `);
  });
});

it('throws an error when the group has no children', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<cs-radio-group label="label" name="name"> </cs-radio-group>`,
    );
  });
});

it('sets the first radio to be tabbable when none are checked', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three"></cs-radio>
    </cs-radio-group>`,
  );

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '0');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('sets the first non-disabled radio as tabbable when none are checked', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" disabled label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three"></cs-radio>
    </cs-radio-group>`,
  );

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '0');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('no radios are tabbable when the group is "disabled"', async () => {
  await fixture(
    html`<cs-radio-group name="name" disabled>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" checked label="Three"></cs-radio>
    </cs-radio-group>`,
  );

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('disabled radios are not tabbable', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" disabled label="One"></cs-radio>
      <cs-radio value="value-2" disabled label="Two"></cs-radio>
    </cs-radio-group>`,
  );

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(2);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
});

it('sets only the "checked" radio as tabbable', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three" checked></cs-radio>
    </cs-radio-group>`,
  );

  const radios = document.querySelectorAll('cs-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '0');
});

it('has reactive radio attribute "aria-checked"', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
  );

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.be.null;

  expect(radio).to.have.attribute('aria-checked', 'false');

  radio?.setAttribute('checked', '');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-checked', 'true');

  radio?.removeAttribute('checked');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-checked', 'false');
});

it('has reactive radio attribute "aria-disabled"', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
  );

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.be.null;

  expect(radio).to.have.attribute('aria-disabled', 'false');

  radio?.setAttribute('disabled', '');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-disabled', 'true');

  radio?.removeAttribute('disabled');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-disabled', 'false');
});

it('has reactive radio attribute "aria-required"', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
  );

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.be.null;

  expect(radio).to.have.attribute('aria-required', 'false');

  radio?.setAttribute('required', '');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-required', 'true');

  radio?.removeAttribute('required');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-required', 'false');
});

it('has reactive radio attribute "aria-invalid"', async () => {
  await fixture(
    html`<cs-radio-group name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
  );

  const radio = document.querySelector('cs-radio');

  expect(radio).to.not.be.null;

  expect(radio).to.have.attribute('aria-invalid', 'false');

  radio?.setAttribute('invalid', '');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-invalid', 'true');

  radio?.removeAttribute('invalid');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-invalid', 'false');
});

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('adds a label to radio when given', async () => {
  const component = await fixture<CsRadio>(
    html`<cs-radio value="value-1" label="One"></cs-radio>`,
  );

  const label = component.shadowRoot!.querySelector('.component')?.textContent;

  expect(label).to.contain('One');
  expect(component.ariaLabel).to.equal('One');
});

it('changes the radio label dynamically as when given', async () => {
  const component = await fixture<CsRadio>(
    html`<cs-radio value="value-1" label="One"></cs-radio>`,
  );

  component.label = 'Two';
  await elementUpdated(component);

  const label = component.shadowRoot!.querySelector('.component')?.textContent;

  expect(label).to.contain('Two');
  expect(component.ariaLabel).to.equal('Two');
});
