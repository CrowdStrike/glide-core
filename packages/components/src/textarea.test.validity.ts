import { elementUpdated, expect, fixture } from '@open-wc/testing';
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

it('adds an error class after submit when empty and required', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea required></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  form.requestSubmit();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.exist;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.exist;
});

it('adds an error class after submit when `max-character-count` is exceeded', async () => {
  const form = document.createElement('form');

  const template =
    '<cs-textarea max-character-count="3" value="value"></cs-textarea>';

  const element = await fixture<CsTextarea>(template, { parentNode: form });
  form.requestSubmit();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.exist;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.exist;
});

it('adds an error class after `reportValidity` is called when empty and required', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea required></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.exist;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.exist;
});

it('adds an error class after `reportValidity` is called and `max-character-count` is exceeded', async () => {
  const form = document.createElement('form');

  const template =
    '<cs-textarea value="value" max-character-count="3"></cs-textarea>';

  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.exist;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.exist;
});

it('does not add an error class by default', async () => {
  const template = '<cs-textarea></cs-textarea>';
  const element = await fixture<CsTextarea>(template);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class by default after `reportValidity`', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class by default after `checkValidity`', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.checkValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class after `reportValidity` is called when required and has a value', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea value="value" required></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class after `reportValidity` is called, `max-character-count` is not exceeded, and has a value', async () => {
  const form = document.createElement('form');

  const template =
    '<cs-textarea value="value" max-character-count="8"></cs-textarea>';

  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class after `reportValidity` is called when required and disabled', async () => {
  const form = document.createElement('form');
  const template = '<cs-textarea disabled required></cs-textarea>';
  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});

it('does not add an error class after `reportValidity` is called, `max-character-count` is exceeded, and is disabled', async () => {
  const form = document.createElement('form');

  const template =
    '<cs-textarea value="value" disabled max-character-count="8"></cs-textarea>';

  const element = await fixture<CsTextarea>(template, { parentNode: form });
  element.reportValidity();
  await elementUpdated(element);

  expect(
    element.shadowRoot?.querySelector('[data-test-textarea-invalid-color]'),
  ).to.be.null;

  expect(
    element.shadowRoot?.querySelector(
      '[data-test-description-container--invalid-color]',
    ),
  ).to.be.null;
});
