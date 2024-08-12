/* eslint-disable @typescript-eslint/no-unused-expressions */

import './radio-group.js';
import './radio.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreRadio from './radio.js';
import GlideCoreRadioGroup from './radio-group.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('focuses the first radio when `focus` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('focuses the first radio after submit when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const radio = component.querySelector('glide-core-radio');

  expect(radio).to.have.focus;
});

it('focuses the first radio after `reportValidity` is called when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('focuses the first radio after `requestSubmit` is called when the group is "required" and the radio is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('does not focus the a radio after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('glide-core-radio'),
  );
});

it('focuses the first checked radio when it exists', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('glide-core-radio[value="value-2"]');
  expect(radio).to.have.focus;
});

it('focuses the first tabbable radio when none are checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" disabled label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
      <glide-core-radio value="value-3" label="Three"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  const radio = component.querySelector('glide-core-radio[value="value-2"]');
  expect(radio).to.have.focus;
});

it('reports validity if blurred', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Checkbox Group" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  const radioItems = component.querySelectorAll('glide-core-radio');

  expect(document.activeElement === radioItems[0]).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-private-label')
      ?.hasAttribute('error'),
  ).to.be.false;

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.be.true;

  expect(component.validity.valid).to.equal(false);

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-private-label')
      ?.hasAttribute('error'),
  ).to.be.true;
});
