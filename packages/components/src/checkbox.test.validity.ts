import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('is valid if unchecked but not required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid but not aria-invalid after being checked when unchecked and required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
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
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
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
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      required
    ></glide-core-checkbox>`,
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
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});
