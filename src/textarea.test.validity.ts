/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTextarea from './textarea.js';

GlideCoreTextarea.shadowRootOptions.mode = 'open';

it('is valid by default', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid after being filled in and required', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  component.focus();
  await sendKeys({ type: 'value' });

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid if no value and required', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid when empty and does not exceed `maxlength`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea maxlength="3"></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in and does not exceed `maxlength`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea maxlength="3"></glide-core-textarea>`,
  );

  component.focus();
  await sendKeys({ type: 'abc' });

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid when filled in and exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea maxlength="3"></glide-core-textarea>`,
  );

  component.focus();
  await sendKeys({ type: 'value' });

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid if no value but required and disabled', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required disabled></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('updates validity when `required` and `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.value = 'text';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');

  // Resetting the value to empty to ensure it goes
  // back to an invalid state
  component.value = '';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');

  component.required = true;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid when `value` is empty and `required` is set to `false` programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.required = false;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in, disabled, and value exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      disabled
      maxlength="3"
    ></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in, readonly, and value exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      readonly
      maxlength="3"
    ></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('blurs the textarea and reports validity if `blur` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  component.focus();

  const textareaElement = component.shadowRoot?.querySelector('textarea');
  expect(component.shadowRoot?.activeElement === textareaElement).to.be.true;

  component.blur();
  await component.updateComplete;

  expect(component.shadowRoot?.activeElement === null).to.be.true;

  expect(component.validity.valid).to.be.false;

  expect(component.shadowRoot?.querySelector('glide-core-private-label')?.error)
    .to.be.true;
});
