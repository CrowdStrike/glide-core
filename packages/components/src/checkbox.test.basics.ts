import { expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-checkbox')).to.equal(CsCheckbox);
});

it('has defaults', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  expect(component.hasAttribute('checked')).to.be.false;
  expect(component.checked).to.be.false;

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.disabled).to.be.false;

  expect(component.hasAttribute('indeterminate')).to.be.false;
  expect(component.indeterminate).to.be.false;

  expect(component.getAttribute('label')).to.be.null;
  expect(component.label).to.equal(undefined);

  expect(component.getAttribute('name')).to.be.null;
  expect(component.name).to.equal(undefined);

  expect(component.getAttribute('orientation')).to.equal('horizontal');
  expect(component.orientation).to.equal('horizontal');

  expect(component.hasAttribute('required')).to.be.false;
  expect(component.required).to.be.false;

  expect(component.getAttribute('summary')).to.be.null;
  expect(component.summary).to.equal(undefined);

  expect(component.getAttribute('value')).to.equal('');
  expect(component.value).to.equal('');
});

it('is accessible', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label">
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </cs-checkbox>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label"></cs-checkbox> `,
  );

  expect(component.getAttribute('label')).to.equal('Label');
  expect(component.label).to.equal('Label');
});

it('can have a description', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox>
      <div slot="description">Description</div>
    </cs-checkbox>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a name', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox name="name"></cs-checkbox> `,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can have a summary', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox summary="Summary"></cs-checkbox> `,
  );

  expect(component.getAttribute('summary')).to.equal('Summary');
  expect(component.summary).to.equal('Summary');
});

it('can have a tooltip', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox>
      <div slot="tooltip">Tooltip</div>
    </cs-checkbox>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be checked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked></cs-checkbox> `,
  );

  expect(component.hasAttribute('checked')).to.be.true;
  expect(component.checked).to.equal(true);
});

it('can be disabled', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled></cs-checkbox> `,
  );

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});

it('can be indeterminate', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox indeterminate></cs-checkbox> `,
  );

  expect(component.hasAttribute('indeterminate')).to.be.true;
  expect(component.indeterminate).to.equal(true);
});

it('can be required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox> `,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.equal(true);
});

it('places the tooltip on the right when vertical', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox orientation="vertical"></cs-checkbox> `,
  );

  expect(
    component.shadowRoot
      ?.querySelector('cs-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('right');
});

it('places the tooltip on the bottom when horizontal', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox orientation="horizontal"></cs-checkbox> `,
  );

  expect(
    component.shadowRoot
      ?.querySelector('cs-tooltip')
      ?.getAttribute('placement'),
  ).to.equal('bottom');
});

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label"></cs-checkbox>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});
