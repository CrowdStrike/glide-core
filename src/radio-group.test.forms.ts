/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreRadio from './radio-group.radio.js';
import GlideCoreRadioGroup from './radio-group.js';
import sinon from 'sinon';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('can reset when `value` is programmatically changed', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.value = 'two';

  await elementUpdated(component);

  form.reset();

  await elementUpdated(component);

  expect(component.value).to.equal('one');
});

it('can reset when the checked Radios are changed via click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadio>('glide-core-radio');

  radios[0].click();

  await elementUpdated(component);

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(component.value).to.equal('one');

  form.reset();

  await elementUpdated(component);

  expect(radios[0].getAttribute('checked')).to.be.null;
  expect(radios[1].hasAttribute('checked')).to.be.true;
  expect(component.value).to.equal('two');
});

it('can reset when the checked Radios are changed programmatically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadio>('glide-core-radio');

  radios[1].checked = false;
  radios[0].checked = true;

  await elementUpdated(component);

  expect(radios[0].hasAttribute('checked')).to.be.true;
  expect(radios[1]).to.not.have.attribute('checked');
  expect(component.value).to.equal('one');

  form.reset();

  await elementUpdated(component);

  expect(radios[0].getAttribute('checked')).to.be.null;
  expect(radios[1].hasAttribute('checked')).to.be.true;
  expect(component.value).to.equal('two');
});

it('has `formData` when a Radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('two');
});

it('has `formData` when the Radio Group has a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" value="two">
      <glide-core-radio label="One" value="one" checked></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('two');
});

it('has no `formData` when no Radios are checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when the group is disabled and one Radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label" name="name" disabled>
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when a Radio is checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio
        label="One"
        value="one"
        checked
        disabled
      ></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when without a `name` but a Radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when a Radio is checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two" checked></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  component.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('resets `value` to an empty string when no Radios were initially selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label">
      <glide-core-radio label="One" value="one"></glide-core-radio>
      <glide-core-radio label="Two" value="two"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadio>('glide-core-radio');

  radios[0].click();

  await elementUpdated(component);

  form.reset();

  await elementUpdated(component);

  expect(component.value).to.equal('');
});
