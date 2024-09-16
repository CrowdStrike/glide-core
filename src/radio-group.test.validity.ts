/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadio from './radio.js';
import GlideCoreRadioGroup from './radio-group.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';
GlideCoreRadioGroup.shadowRootOptions.mode = 'open';

it('is valid if not required and radios are unchecked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  const radios = component.querySelectorAll('glide-core-radio');
  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});

it('is valid if required and a radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  const radios = component.querySelectorAll('glide-core-radio');
  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});

it('is invalid if required and no radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and no radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required disabled>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('adds an error class after submit when invalid and required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  form.requestSubmit();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.true;
});

it('adds an error class after `reportValidity` is called when invalid and required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.true;

  const radios = document.querySelectorAll('glide-core-radio');

  expect(radios[0]?.invalid).to.be.true;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('true');
  expect(radios[1]?.invalid).to.be.true;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('true');
});

it('does not add an error class by default', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('false');
});

it('does not add an error class after `reportValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('false');
});

it('does not add an error class after `reportValidity` is called when required and a radio is checked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('false');
});

it('does not add an error class after `reportValidity` is called when required but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required disabled>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" checked label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('false');
});

it('does not add an error class after `checkValidity` is called when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.checkValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.getAttribute('aria-invalid')).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.getAttribute('aria-invalid')).to.equal('false');
});

it('sets radios as valid initially when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio value="value-1" label="One"></glide-core-radio>
      <glide-core-radio value="value-2" label="Two"></glide-core-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.required = false;
  await elementUpdated(component);

  const radios = component.querySelectorAll('glide-core-radio');

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});
