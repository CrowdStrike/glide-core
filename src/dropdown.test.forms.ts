import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

it('submits its form on Enter when closed', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('does not submit its form on Enter when open', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('does not submit its form when Enter is pressed on the Edit button', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
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

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('is valid if not required and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is invalid if required and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is invalid if required and no option is selected when `filterable`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;
});

it('is both invalid and valid if required and disabled and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.checkValidity()).to.be.false;

  await host.updateComplete;

  // Like native, the message shouldn't display until `reportValidity()` is called.
  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');
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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setValidity({ customError: true }, 'validity message');

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
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setValidity({ customError: true }, 'validity message');

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

it('sets the validity message with `setCustomValidity()` when `filterable`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.checkValidity()).to.be.false;

  await host.updateComplete;

  // Like native, the message shouldn't display until `reportValidity()` is called.
  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()` when `filterable`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');
  host.reportValidity();

  await host.updateComplete;

  host.setCustomValidity('');

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is invalid when `setValidity()` is called when `filterable`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setValidity({ customError: true }, 'validity message');

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
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called when `filterable`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setValidity({ customError: true }, 'validity message');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.valueMissing).to.be.true;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.setCustomValidity('validity message');

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');

  host.resetValidityFeedback();

  await host.updateComplete;

  expect(host.shadowRoot?.querySelector('[data-test="validity-message"]')).to.be
    .null;

  expect(host.validity?.valid).to.be.false;
});
