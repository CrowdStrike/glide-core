import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsTextarea from './textarea.js';

CsTextarea.shadowRootOptions.mode = 'open';

it('is valid by default', async () => {
  const template = '<cs-textarea></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});

it('is valid after being filled in and required', async () => {
  const template = '<cs-textarea required></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'value' });

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});

it('is invalid if no value and required', async () => {
  const template = '<cs-textarea required></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.true;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.willValidate).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;
});

it('is valid when empty and does not exceed `max-character-count`', async () => {
  const template = '<cs-textarea max-character-count="3"></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});

it('is valid when filled in and does not exceed `max-character-count`', async () => {
  const template = '<cs-textarea max-character-count="3"></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'abc' });

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});

it('is invalid when filled in and exceeds `max-character-count`', async () => {
  const template = '<cs-textarea max-character-count="3"></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);
  textarea.focus();
  await sendKeys({ type: 'value' });

  expect(textarea.validity?.valid).to.be.false;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.true;
  expect(textarea.checkValidity()).to.be.false;
  expect(textarea.reportValidity()).to.be.false;
});

it('is valid if no value but required and disabled', async () => {
  const template = '<cs-textarea required disabled></cs-textarea>';
  const textarea = await fixture<CsTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});

it('is valid when filled in, disabled, and exceeds `max-character-count`', async () => {
  const template =
    '<cs-textarea value="value" disabled max-character-count="3"></cs-textarea>';

  const textarea = await fixture<CsTextarea>(template);

  expect(textarea.validity?.valid).to.be.true;
  expect(textarea.validity?.valueMissing).to.be.false;
  expect(textarea.validity?.tooLong).to.be.false;
  expect(textarea.checkValidity()).to.be.true;
  expect(textarea.reportValidity()).to.be.true;
});
