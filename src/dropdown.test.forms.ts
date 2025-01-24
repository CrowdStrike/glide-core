import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

it('submits its form on Enter when closed', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

it('does not submit its form on Enter when open', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

  expect(spy.callCount).to.equal(0);
});

it('does not submit its form when Enter is pressed on the Edit button', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('is valid if not required and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if required and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid if required and no option is selected when `filterable`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      required
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      disabled
      required
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

it('sets the validity message with `setCustomValidity()` when `filterable`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()` when `filterable`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

it('is invalid when `setValidity()` is called when `filterable`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

it('is valid when `setValidity()` is called when `filterable`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('removes validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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
