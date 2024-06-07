import './radio-group.js';
import './radio.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('focuses the first radio when `focus` is called', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(component.querySelector('cs-radio'));
});

it('focuses the first radio after submit when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const radio = component.querySelector('cs-radio');

  expect(radio).to.have.focus;
});

it('focuses the first radio after `reportValidity` is called when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(component.querySelector('cs-radio'));
});

it('focuses the first radio after `requestSubmit` is called when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(component.querySelector('cs-radio'));
});

it('does not focus the a radio after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('cs-radio'),
  );
});

it('focuses the first checked radio when it exists', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three"></cs-radio>
    </cs-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('cs-radio[value="value-2"]');
  expect(radio).to.have.focus;
});

it('focuses the first tabbable radio when none are checked', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" disabled label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
      <cs-radio value="value-3" label="Three"></cs-radio>
    </cs-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('cs-radio[value="value-2"]');
  expect(radio).to.have.focus;
});
