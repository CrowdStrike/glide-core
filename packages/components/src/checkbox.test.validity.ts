import { expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('is valid if unchecked but not required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label"></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid but not aria-invalid after being checked when unchecked and required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
  );

  component.click();

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid but not aria-invalid if unchecked and required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid but not aria-invalid after being unchecked when required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" checked required></cs-checkbox>`,
  );

  component.click();

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is both invalid and valid if unchecked and required but disabled', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" disabled required></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});
