import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click } from './library/mouse.js';
import GlideCoreRadioGroup from './radio-group.js';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';

it('can be reset when `value` is programmatically changed', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" value="one">
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

  host.value = 'two';
  await host.updateComplete;

  form.reset();
  await host.updateComplete;

  expect(host.value).to.equal('one');
});

it('has `formData` when it has a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" value="two">
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

it('has no `formData` when it is disabled', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="Label" name="name" disabled>
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

it('has no `formData` when its checked radio is disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
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

it('has no `formData` when without a `name`', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="Label">
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

it('has no `formData` value when its checked radio has no value', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-radio-group label="Label">
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

  await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('resets `value` to an empty string when no radios were initially checked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label">
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

  const radios = host.querySelectorAll<GlideCoreRadioGroupRadio>(
    'glide-core-radio-group-radio',
  );

  await click(radios[0]);
  form.reset();
  await host.updateComplete;

  expect(host.value).to.equal('');
});

it('is valid if not required and radios are unchecked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
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

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('is valid if required and a radio is checked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
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

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');
  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].ariaInvalid).to.equal('false');
});

it('is invalid if required and no radio is checked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
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

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
        checked
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  const radio = host.querySelector('glide-core-radio-group-radio');
  assert(radio);

  radio.checked = false;

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is both invalid and valid if required and disabled and no radio is checked', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" disabled required>
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

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid when `required` is set to `false` programmatically', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
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

  host.required = false;
  await host.updateComplete;

  const radios = host.querySelectorAll('glide-core-radio-group-radio');

  expect(radios[0].ariaInvalid).to.equal('false');
  expect(radios[1].ariaInvalid).to.equal('false');

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is invalid when `required` is set to `true` programmatically and no radio is checked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
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

  host.required = true;
  await host.updateComplete;

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is valid when required after `value` is set', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  host.value = 'one';

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('sets its validity message with `setCustomValidity()`', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setCustomValidity('message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.checkValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('message');
});

it('removes its validity message when `setCustomValidity()` is called with no argument', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setCustomValidity('message');
  host.reportValidity();
  await host.updateComplete;

  host.setCustomValidity('');
  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is invalid when `setValidity()` is called with a custom error', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setValidity({ customError: true }, 'message');

  expect(host.validity.valid).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.validity?.customError).to.be.true;

  host.reportValidity();
  await host.updateComplete;

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('message');
});

it('is valid when `setValidity()` is called', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
      <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setValidity({ customError: true }, 'message');
  host.setValidity({});
  await host.updateComplete;

  expect(host.validity.valid).to.be.true;
  expect(host.validity.customError).to.be.false;

  expect(host.reportValidity()).to.be.true;
  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('retains existing validity state when `setCustomValidity()` is called', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name" required>
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setCustomValidity('message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.valueMissing).to.be.true;
});

it('reports validity when blurred', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" required>
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement).to.equal(document.body);

  expect(host.validity.valid).to.be.false;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<GlideCoreRadioGroup>(
    html`<glide-core-radio-group label="Label" name="name">
      <glide-core-radio-group-radio
        label="One"
        value="one"
      ></glide-core-radio-group-radio>
    </glide-core-radio-group>`,
  );

  host.setCustomValidity('message');

  expect(host.reportValidity()).to.be.false;
  await host.updateComplete;

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="validity-message"]')
      ?.textContent?.trim(),
  ).to.equal('message');

  host.resetValidityFeedback();
  await host.updateComplete;

  expect(host.shadowRoot?.querySelector('[data-test="validity-message"]')).to.be
    .null;

  expect(host.validity?.valid).to.be.false;
});
