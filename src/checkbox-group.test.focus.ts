/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreCheckbox from './checkbox.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';
GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('focuses the first enabled checkbox when `focus()` is called', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One" disabled></glide-core-checkbox>
      <glide-core-checkbox label="Two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox:last-of-type'),
  );
});

it('focuses the first checkbox after submit when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `reportValidity` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `requestSubmit` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('reports validity of checkboxes if blurred', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox1"></glide-core-checkbox>
      <glide-core-checkbox label="Checkbox2"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.focus();

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(document.activeElement === checkboxes[0]).to.be.true;
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === checkboxes[1]).to.be.true;
  expect(checkboxes[0].privateIsReportValidityOrSubmit).to.be.false;
  expect(checkboxes[1].privateIsReportValidityOrSubmit).to.be.false;

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.be.true;

  expect(component.validity.valid).to.be.false;
  expect(checkboxes[0].validity.valid).to.be.false;
  expect(checkboxes[0].privateIsReportValidityOrSubmit).to.be.true;
  expect(checkboxes[1].validity.valid).to.be.false;
  expect(checkboxes[1].privateIsReportValidityOrSubmit).to.be.true;
});
