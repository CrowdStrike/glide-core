import './checkbox.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('focuses the first checkbox when `focus` is called', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.focus();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after submit when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `reportValidity` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.reportValidity();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `requestSubmit` is called when required but the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    component.querySelector('glide-core-checkbox'),
  );
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.checkValidity();

  expect(document.activeElement).to.not.equal(
    component.querySelector('glide-core-checkbox'),
  );
});
