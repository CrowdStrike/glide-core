import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const checkbox = component.querySelector('glide-core-checkbox');
  assert(checkbox);

  checkbox.checked = false;
  form.reset();

  expect(component.value).to.deep.equal(['value']);
});

it('has `formData` when the checkboxes are checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="One"
        value="one"
        checked
      ></glide-core-checkbox>

      <glide-core-checkbox
        label="Two"
        value="two"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["one","two"]');
});

it('has `formData` when the checkbox is checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
        indeterminate
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["value"]');
});

it('has no `formData` when the checkboxes are unchecked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when disabled and the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name" disabled>
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when the checkbox is checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
        disabled
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when without a `name` but the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when the checkbox is checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox label="Checkbox" checked></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('is valid if not required and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid if required and the checkbox is checked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  await click(component.querySelector('glide-core-checkbox'));

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if required and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  await click(component.querySelector('glide-core-checkbox'));

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" disabled required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the checkbox as valid when `required` is set to `false` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.required = false;
  await component.updateComplete;

  const checkbox = component.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.true;
});

it('sets the checkbox as invalid when `required` is set to `true` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.required = true;
  await component.updateComplete;

  const checkbox = component.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.false;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('sets the validity of its checkboxes when when tabbed away from', async () => {
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
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.be.true;
  expect(component.validity.valid).to.be.false;
  expect(checkboxes[0].validity.valid).to.be.false;
  expect(checkboxes[1].validity.valid).to.be.false;
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('removes validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.setCustomValidity('validity message');

  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');

  component.resetValidityFeedback();

  await component.updateComplete;

  expect(component.shadowRoot?.querySelector('[data-test="validity-message"]'))
    .to.be.null;

  expect(component.validity?.valid).to.be.false;
});
