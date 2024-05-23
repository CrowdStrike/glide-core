import './checkbox.js';
import { ArgumentError } from 'ow';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsCheckboxGroup from './checkbox-group.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

CsCheckboxGroup.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-checkbox-group')).to.equal(
    CsCheckboxGroup,
  );
});

it('has defaults', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.hasAttribute('disabled')).to.be.false;
  expect(component.disabled).to.be.false;

  expect(component.getAttribute('name')).to.be.null;
  expect(component.name).to.equal(undefined);

  expect(component.hasAttribute('required')).to.be.false;
  expect(component.required).to.be.false;

  // Not reflected, so no attribute assertion is necessary.
  expect(component.value).to.deep.equal([]);
});

it('is accessible', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
      <div slot="tooltip">Tooltip</div>
      <div slot="description">Description</div>
    </cs-checkbox-group>`,
  );

  await expect(component).to.be.accessible();
});

it('can have a label', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.getAttribute('label')).to.equal('Checkbox Group');
  expect(component.label).to.equal('Checkbox Group');
});

it('can have a description', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
      <div slot="description">Description</div>
    </cs-checkbox-group>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="description"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Description');
});

it('can have a name', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.getAttribute('name')).to.equal('name');
  expect(component.name).to.equal('name');
});

it('can have a tooltip', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
      <div slot="tooltip">Tooltip</div>
    </cs-checkbox-group>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tooltip"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Tooltip');
});

it('can be disabled initially', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" disabled>
      <cs-checkbox label="One"></cs-checkbox>
      <cs-checkbox label="Two"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  const checkboxes = component.querySelectorAll('cs-checkbox');

  expect(checkboxes[0].disabled).to.equal(true);
  expect(checkboxes[1].disabled).to.equal(true);

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});

it('can be disabled dynamically', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="One"></cs-checkbox>
      <cs-checkbox label="Two"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  component.disabled = true;
  await elementUpdated(component);

  const checkboxes = component.querySelectorAll('cs-checkbox');

  expect(checkboxes[0].disabled).to.equal(true);
  expect(checkboxes[1].disabled).to.equal(true);

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.equal(true);
});

it('can be required', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.hasAttribute('required')).to.be.true;
  expect(component.required).to.equal(true);
});

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<CsCheckboxGroup>(
      html`<cs-checkbox-group label="Checkbox Group"></cs-checkbox-group>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<CsCheckboxGroup>(
      html`<cs-checkbox-group label="Checkbox Group">
        <button>Button</button>
      </cs-checkbox-group>`,
    );
  });
});
