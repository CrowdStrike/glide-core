import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import CheckboxGroup from './checkbox-group.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox
        label="Label"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const checkbox = host.querySelector('glide-core-checkbox');
  assert(checkbox);

  checkbox.checked = false;
  form.reset();

  expect(host.value).to.deep.equal(['value']);
});

it('has `formData` when the checkboxes are checked', async () => {
  const form = document.createElement('form');

  await fixture(
    html`<glide-core-checkbox-group label="Label" name="name">
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
  expect(formData.get('name')).to.equal('["one","two"]');
});

it('has `formData` when the checkbox is checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" name="name">
      <glide-core-checkbox
        label="Label"
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
  expect(formData.get('name')).to.equal('["value"]');
});

it('has no `formData` when the checkboxes are unchecked', async () => {
  const form = document.createElement('form');

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" name="name">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
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

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" name="name" disabled>
      <glide-core-checkbox
        label="Label"
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

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" name="name">
      <glide-core-checkbox
        label="Label"
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

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox
        label="Label"
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

  await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" name="name">
      <glide-core-checkbox label="Label" checked></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('is valid if not required and its checkbox is unchecked', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid if required and its checkbox is checked', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  await click(host.querySelector('glide-core-checkbox'));

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is invalid if required and its checkbox is unchecked', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox
        label="Label"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  await click(host.querySelector('glide-core-checkbox'));

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is both invalid and valid if required and disabled and its checkbox is unchecked', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" disabled required>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('sets its checkbox as valid when `required` is set to `false` programmatically', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.required = false;
  await host.updateComplete;

  const checkbox = host.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.true;
});

it('sets its checkbox as invalid when `required` is set to `true` programmatically', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.required = true;
  await host.updateComplete;

  const checkbox = host.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.false;
});

it('sets its validity message with `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.setCustomValidity('message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('message');
});

it('sets its validity of its checkboxes when tabbed away from', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(checkboxes[0]);

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(checkboxes[1]);

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement).to.equal(document.body);
  expect(host.validity.valid).to.be.false;
  expect(checkboxes[0]?.validity.valid).to.be.false;
  expect(checkboxes[1]?.validity.valid).to.be.false;
});

it('sets its validity of its checkboxes when it loses focus', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(checkboxes[0]);

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(checkboxes[1]);

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement).to.equal(document.body);
  expect(host.validity.valid).to.be.false;
  expect(checkboxes[0]?.validity.valid).to.be.false;
  expect(checkboxes[1]?.validity.valid).to.be.false;
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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

it('is invalid when `setValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.setValidity({ customError: true }, 'message');

  expect(host.validity.valid).to.be.false;

  await host.updateComplete;

  // Like native, the message shouldn't display until `reportValidity()` is called.
  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.validity?.customError).to.be.true;

  host.reportValidity();

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('message');
});

it('is valid when `setValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.setCustomValidity('message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.valueMissing).to.be.true;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.setCustomValidity('message');

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('message');

  host.resetValidityFeedback();

  await host.updateComplete;

  expect(host.shadowRoot?.querySelector('[data-test="validity-message"]')).to.be
    .null;

  expect(host.validity?.valid).to.be.false;
});
