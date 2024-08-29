/* eslint-disable @typescript-eslint/no-unused-expressions */

import './radio-group.js';
import './radio.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadio from './radio.js';
import GlideCoreRadioGroup from './radio-group.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-radio-group')).to.equal(
    GlideCoreRadioGroup,
  );

  expect(window.customElements.get('glide-core-radio')).to.equal(
    GlideCoreRadio,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
      <span slot="tooltip">Tooltip</span>
      <div slot="description">Description</div>
    </glide-core-radio-group>
  `);

  await expect(component).to.be.accessible();
});

it('renders appropriate attributes on glide-core-radio', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two" checked></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radios = document.querySelectorAll('glide-core-radio');

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
  const group = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <span slot="tooltip" data-test="tooltip">Tooltip</span>
      <div slot="description" data-test="description">Description</div>
    </glide-core-radio-group>
  `);

  const label = group.shadowRoot?.querySelector('[data-test="label"]');
  const radioGroup = group?.shadowRoot?.querySelector('[role="radiogroup"]');
  const tooltip = document.querySelector('[data-test="tooltip"]');

  const description = document?.querySelector('[data-test="description"]');

  expect(group).to.not.be.null;
  expect(label).to.not.be.null;
  expect(radioGroup).to.not.be.null;
  expect(tooltip).to.not.be.null;
  expect(description).to.not.be.null;
});

it('does not render a required symbol when a "label" is given and "required" is not set', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const group = document.querySelector('glide-core-radio-group');

  const requiredSymbol = group?.shadowRoot?.querySelector(
    '[data-test="label-required"]',
  );

  expect(requiredSymbol).to.be.null;
});

it('sets "required" attributes on radios when "required" is set on the group', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios[0]).to.have.attribute('required');
  expect(radios[0]).to.have.attribute('aria-required', 'true');
  expect(radios[1]).to.have.attribute('required');
  expect(radios[1]).to.have.attribute('aria-required', 'true');
});

it('does not set "required" attributes on radios when "required" is not set on the group', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios[0]).to.not.have.attribute('required');
  expect(radios[0]).to.have.attribute('aria-required', 'false');
  expect(radios[1]).to.not.have.attribute('required');
  expect(radios[1]).to.have.attribute('aria-required', 'false');
});

it('renders radios as "disabled" when "disabled" is set on the group', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1" disabled>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radio = document.querySelector('glide-core-radio');

  expect(radio).to.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'true');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.not.null;
});

it('does not render radios as "disabled" when "disabled" is not set on the group', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radio = document.querySelector('glide-core-radio');

  expect(radio).to.not.have.attribute('disabled');
  expect(radio).to.have.attribute('aria-disabled', 'false');
  expect(radio?.shadowRoot?.querySelector('.disabled')).to.be.null;
});

it('renders radios as "disabled" when "disabled" is dynamically set and removed on the group', async () => {
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name" value="value-1">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radio = document.querySelector('glide-core-radio');

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
  const component = await fixture<GlideCoreRadioGroup>(html`
    <glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const radios = document.querySelectorAll('glide-core-radio');

  expect(component.value).to.equal('');
  expect(radios.length).to.equal(2);

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[0]).to.have.attribute('aria-checked', 'false');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(radios[1]).to.have.attribute('aria-checked', 'false');
});

it('sets the group "value" when a radio is set as "checked"', async () => {
  await fixture(html`
    <glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>
  `);

  const group = document.querySelector('glide-core-radio-group');

  expect(group).to.have.attribute('value', 'value-2');
});

it('throws an error when an component other than `glide-core-radio` is a child of the default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-radio-group label="label" name="name">
        <div>Option 1</div>
        <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      </glide-core-radio-group>
    `);
  });
});

it('throws an error when the group has no children', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-radio-group label="label" name="name">
      </glide-core-radio-group>`,
    );
  });
});

it('sets the first radio to be tabbable when none are checked', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '0');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('sets the first non-disabled radio as tabbable when none are checked', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" disabled label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '0');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('no radios are tabbable when the group is "disabled"', async () => {
  await fixture(
    html`<glide-core-radio-group name="name" disabled>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio
        value="value-3"
        checked
        label="Three"
      ></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '-1');
});

it('disabled radios are not tabbable', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" disabled label="One"></glide-core-radio>
      <glide-core-radio value="value-2" disabled label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(2);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
});

it('sets only the "checked" radio as tabbable', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio
        value="value-3"
        label="Three"
        checked
      ></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios.length).to.equal(3);
  expect(radios[0]).to.have.attribute('tabindex', '-1');
  expect(radios[1]).to.have.attribute('tabindex', '-1');
  expect(radios[2]).to.have.attribute('tabindex', '0');
});

it('has reactive radio attribute "aria-checked"', async () => {
  await fixture(
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = document.querySelector('glide-core-radio');

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
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = document.querySelector('glide-core-radio');

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
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = document.querySelector('glide-core-radio');

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
    html`<glide-core-radio-group name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  const radio = document.querySelector('glide-core-radio');

  expect(radio).to.not.be.null;

  expect(radio).to.have.attribute('aria-invalid', 'false');

  radio?.setAttribute('invalid', '');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-invalid', 'true');

  radio?.removeAttribute('invalid');

  await elementUpdated(radio!);

  expect(radio).to.have.attribute('aria-invalid', 'false');
});

it('adds a label to radio when given', async () => {
  const component = await fixture<GlideCoreRadio>(
    html`<glide-core-radio value="value-1" label="One"></glide-core-radio>`,
  );

  const label = component.shadowRoot!.querySelector('.component')?.textContent;

  expect(label).to.contain('One');
  expect(component.ariaLabel).to.equal('One');
});

it('changes the radio label dynamically as when given', async () => {
  const component = await fixture<GlideCoreRadio>(
    html`<glide-core-radio value="value-1" label="One"></glide-core-radio>`,
  );

  component.label = 'Two';
  await elementUpdated(component);

  const label = component.shadowRoot!.querySelector('.component')?.textContent;

  expect(label).to.contain('Two');
  expect(component.ariaLabel).to.equal('Two');
});
