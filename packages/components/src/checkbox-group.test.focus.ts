import './checkbox.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsCheckboxGroup from './checkbox-group.js';

CsCheckboxGroup.shadowRootOptions.mode = 'open';

it('focuses the first checkbox when `focus` is called', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('cs-checkbox'),
  );
});

it('focuses the first checkbox after submit when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('cs-checkbox'),
  );
});

it('focuses the first checkbox after `reportValidity` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(
    component.querySelector('cs-checkbox'),
  );
});

it('focuses the first checkbox after `requestSubmit` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('cs-checkbox'),
  );
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('cs-checkbox'),
  );
});
