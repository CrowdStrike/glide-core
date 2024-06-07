import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" checked label="One"></cs-radio>
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

it('can reset correctly when the checked radios are changed', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<CsRadio>('cs-radio');

  radios[0].click();

  await elementUpdated(component);

  expect(radios[0]).to.have.attribute('checked');
  expect(radios[1]).to.not.have.attribute('checked');
  expect(component.value).to.equal('value-1');

  form.reset();

  await elementUpdated(component);

  expect(radios[0]).to.not.have.attribute('checked');
  expect(radios[1]).to.have.attribute('checked');
  expect(component.value).to.equal('value-2');
});

it('has `formData` when a radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
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
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
