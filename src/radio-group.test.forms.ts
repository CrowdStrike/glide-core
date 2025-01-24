import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click } from './library/mouse.js';
import GlideCoreRadioGroup from './radio-group.js';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';

it('can reset when `value` is programmatically changed', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" value="one">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  component.value = 'two';
  await component.updateComplete;

  form.reset();
  await component.updateComplete;

  expect(component.value).to.equal('one');
});

it('can reset when the checked radios are changed via click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadioGroupRadio>(
    'glide-core-radio-group-radio',
  );

  await click(radios[0]);

  expect(radios[0].checked).to.be.true;
  expect(radios[1].checked).to.be.false;
  expect(component.value).to.equal('one');

  form.reset();
  await component.updateComplete;

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.true;
  expect(component.value).to.equal('two');
});

it('can reset when the checked radios are changed programmatically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadioGroupRadio>(
    'glide-core-radio-group-radio',
  );

  radios[1].checked = false;
  radios[0].checked = true;
  await component.updateComplete;

  expect(component.value).to.equal('one');

  form.reset();

  await component.updateComplete;

  expect(radios[0].checked).to.be.false;
  expect(radios[1].checked).to.be.true;
  expect(component.value).to.equal('two');
});

it('has `formData` when a radio is checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('two');
});

it('has `formData` when it has a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" value="two">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('two');
});

it('has no `formData` when no radios are checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
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
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when a radio is checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
        disabled
      ></glide-core-radio-group-radio>
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
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
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
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
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
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
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

it('resets `value` to an empty string when no radios were initially selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    {
      parentNode: form,
    },
  );

  const radios = component.querySelectorAll<GlideCoreRadioGroupRadio>(
    'glide-core-radio-group-radio',
  );

  await click(radios[0]);

  form.reset();

  await component.updateComplete;

  expect(component.value).to.equal('');
});

it('is valid if not required and radios are unchecked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await component.updateComplete;

  const radios = component.querySelectorAll('glide-core-radio-group-radio');
  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('is valid if required and a radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await component.updateComplete;

  const radios = component.querySelectorAll('glide-core-radio-group-radio');
  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('is invalid if required and no radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radio = component.querySelector('glide-core-radio-group-radio');
  assert(radio);

  radio.checked = false;

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and no radio is checked', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" disabled required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
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
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  form.requestSubmit();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.true;
});

it('adds an error class after `reportValidity()` is called when invalid and required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.true;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0]?.privateInvalid).to.be.true;
  expect(radios[0]?.ariaInvalid).to.equal('true');
  expect(radios[1]?.privateInvalid).to.be.true;
  expect(radios[1]?.ariaInvalid).to.equal('true');
});

it('does not add an error class by default', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.checkValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('does not add an error class after `reportValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('does not add an error class after `reportValidity()` is called when required and a radio is checked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('does not add an error class after `reportValidity()` is called when required but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required disabled>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.reportValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('does not add an error class after `checkValidity()` is called when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.checkValidity();
  await component.updateComplete;

  const isComponentErrorClass = component.shadowRoot
    ?.querySelector('.radio-container')
    ?.classList.contains('invalid');

  expect(isComponentErrorClass).to.be.false;

  const radios = document.querySelectorAll('glide-core-radio-group-radio');

  let isRadioError = radios[0].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  isRadioError = radios[1].shadowRoot
    ?.querySelector('[data-test="radio"]')
    ?.classList.contains('invalid');

  expect(isRadioError).to.be.false;

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('sets the group as valid when `required` is set to `false` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.required = false;
  await component.updateComplete;

  const radios = component.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].privateInvalid).to.be.false;
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].privateInvalid).to.be.false;
  expect(radios[1].ariaInvalid).to.equal('false');

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the group as invalid when `required` is set to `true` dynamically when no Radio is checked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
    { parentNode: form },
  );

  component.required = true;
  await component.updateComplete;

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is valid when required after `value` is set', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  component.value = 'one';

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.checkValidity()).to.be.false;

  await component.updateComplete;

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setCustomValidity('validity message');
  component.reportValidity();

  await component.updateComplete;

  component.setCustomValidity('');

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is invalid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  expect(component.validity.valid).to.be.false;

  await component.updateComplete;

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.validity?.customError).to.be.true;

  component.reportValidity();

  await component.updateComplete;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  component.setValidity({});

  await component.updateComplete;

  expect(component.validity.valid).to.be.true;
  expect(component.validity.customError).to.be.false;

  expect(component.reportValidity()).to.be.true;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('retains existing validity state when `setCustomValidity()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('reports validity when blurred', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Checkbox Group" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>

      <glide-core-radio-group-radio
        label="Two"
        value="two"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.focus();

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.be.true;

  expect(component.validity.valid).to.be.false;
});

it('removes validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const component = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  component.setCustomValidity('validity message');

  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('validity message');

  component.resetValidityFeedback();

  await component.updateComplete;

  expect(component.shadowRoot?.querySelector('[data-test="validity-message"]'))
    .to.be.null;

  expect(component.validity?.valid).to.be.false;
});
