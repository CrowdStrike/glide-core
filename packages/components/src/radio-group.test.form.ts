import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreRadio from './radio.js';
import GlideCoreRadioGroup from './radio-group.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" checked label="One"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radio = component.querySelector('glide-core-radio');
  assert(radio);

  radio.checked = false;
  form.reset();

  expect(component.value).to.equal('value-1');
});

it('can reset correctly when the checked radios are changed', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadio>('glide-core-radio');

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
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
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
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
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
    html`<glide-core-radio-group label="label" name="name" disabled>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
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
    html`<glide-core-radio-group label="label">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
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
    html`<glide-core-radio-group label="label">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
