import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsRadio from './radio.js';
import CsRadioGroup from './radio-group.js';

CsRadio.shadowRootOptions.mode = 'open';
CsRadioGroup.shadowRootOptions.mode = 'open';

it('is valid if not required and radios are unchecked', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  const radios = component.querySelectorAll('cs-radio');
  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});

it('is valid if required and a radio is checked', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  const radios = component.querySelectorAll('cs-radio');
  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});

it('is invalid if required and no radio is checked', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and no radio is checked', async () => {
  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required disabled>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('adds an error class after submit when invalid and required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
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

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.true;

  const radios = document.querySelectorAll('cs-radio');

  expect(radios[0]?.invalid).to.be.true;
  expect(radios[0]).to.have.attribute('aria-invalid', 'true');
  expect(radios[1]?.invalid).to.be.true;
  expect(radios[1]).to.have.attribute('aria-invalid', 'true');
});

it('does not add an error class by default', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('cs-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
});

it('does not add an error class after `reportValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name">
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('cs-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
});

it('does not add an error class after `reportValidity` is called when required and a radio is checked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('cs-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
});

it('does not add an error class after `reportValidity` is called when required but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required disabled>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" checked label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('cs-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
});

it('does not add an error class after `checkValidity` is called when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.checkValidity();
  await elementUpdated(component);

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('cs-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]).to.have.attribute('aria-invalid', 'false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]).to.have.attribute('aria-invalid', 'false');
});

it('sets radios as valid initially when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsRadioGroup>(
    html`<cs-radio-group label="label" name="name" required>
      <cs-radio value="value-1" label="One"></cs-radio>
      <cs-radio value="value-2" label="Two"></cs-radio>
    </cs-radio-group>`,
    { parentNode: form },
  );

  component.required = false;
  await elementUpdated(component);

  const radios = component.querySelectorAll('cs-radio');

  expect(radios[0]?.invalid).to.be.false;
  expect(radios[0]?.ariaInvalid).to.equal('false');
  expect(radios[1]?.invalid).to.be.false;
  expect(radios[1]?.ariaInvalid).to.equal('false');
});
