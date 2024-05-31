import { assert, expect, fixture, html } from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" checked>Option 1</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radio = component.querySelector('cs-radio');
  assert(radio);

  radio.checked = false;
  form.reset();

  expect(component.value).to.equal('value-1');
});

it('has `formData` when a radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2" checked>Option 2</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value-2');
});

it('has no `formData` when no radios are checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2">Option 2</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when the group is disabled and one radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label" name="name" disabled>
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2" checked>Option 2</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when without a `name` but a radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2" checked>Option 2</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when a radio is checked but without a "value"', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label">
      <cs-radio value="value-1">Option 1</cs-radio>
      <cs-radio value="value-2" checked>Option 2</cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
