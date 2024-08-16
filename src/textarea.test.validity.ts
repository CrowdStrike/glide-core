/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTextarea from './textarea.js';

GlideCoreTextarea.shadowRootOptions.mode = 'open';

it('is valid by default', async () => {
  const template = '<glide-core-textarea></glide-core-textarea>';
  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is valid after being filled in and required', async () => {
  const template = '<glide-core-textarea required></glide-core-textarea>';
  const textarea = await fixture<GlideCoreTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'value' });

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is invalid if no value and required', async () => {
  const template = '<glide-core-textarea required></glide-core-textarea>';
  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.willValidate).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is valid when empty and does not exceed `maxlength`', async () => {
  const template = '<glide-core-textarea maxlength="3"></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is valid when filled in and does not exceed `maxlength`', async () => {
  const template = '<glide-core-textarea maxlength="3"></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'abc' });

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is invalid when filled in and exceeds `maxlength`', async () => {
  const template = '<glide-core-textarea maxlength="3"></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'value' });

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is valid if no value but required and disabled', async () => {
  const template =
    '<glide-core-textarea required disabled></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('updates validity when `required` and `value` is changed programmatically', async () => {
  const textarea = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );

  textarea.value = 'text';

  await elementUpdated(textarea);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );

  // Resetting the value to empty to ensure it goes
  // back to an invalid state
  textarea.value = '';

  await elementUpdated(textarea);

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const textarea = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );

  textarea.required = true;

  await elementUpdated(textarea);

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is valid when `value` is empty and `required` is set to `false` programmatically', async () => {
  const textarea = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'true',
  );

  textarea.required = false;

  await elementUpdated(textarea);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is valid when filled in, disabled, and value exceeds `maxlength`', async () => {
  const template =
    '<glide-core-textarea value="value" disabled maxlength="3"></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is valid when filled in, readonly, and value exceeds `maxlength`', async () => {
  const template =
    '<glide-core-textarea value="value" readonly maxlength="3"></glide-core-textarea>';

  const textarea = await fixture<GlideCoreTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;

  await elementUpdated(textarea);

  expect(textarea.shadowRoot?.querySelector('textarea')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('blurs the textarea and reports validity if `blur` is called', async () => {
  const textarea = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  textarea.focus();

  const textareaElement = textarea.shadowRoot?.querySelector('textarea');
  expect(textarea.shadowRoot?.activeElement === textareaElement).to.be.true;

  textarea.blur();
  await textarea.updateComplete;

  expect(textarea.shadowRoot?.activeElement === null).to.be.true;

  expect(textarea.validity.valid).to.equal(false);

  expect(textarea.shadowRoot?.querySelector('glide-core-private-label')?.error)
    .to.be.true;
});
