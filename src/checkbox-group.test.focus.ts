import { expect, fixture, html } from '@open-wc/testing';
import './checkbox.js';
import { sendKeys } from '@web/test-runner-commands';
import CheckboxGroup from './checkbox-group.js';

it('focuses the first enabled checkbox when `focus()` is called', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label" disabled></glide-core-checkbox>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  host.focus();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-checkbox:last-of-type'),
  );
});

it('focuses the first checkbox after submit when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `reportValidity()` is called when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.reportValidity();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-checkbox'),
  );
});

it('focuses the first checkbox after `requestSubmit()` is called when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  form.requestSubmit();

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-checkbox'),
  );
});

it('does not focus the input after `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  host.checkValidity();

  expect(document.activeElement).to.not.equal(
    host.querySelector('glide-core-checkbox'),
  );
});

it('reports validity of checkboxes if blurred', async () => {
  const host = await fixture<CheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  await sendKeys({ press: 'Tab' });

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(checkboxes[1]);

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);

  expect(host.validity.valid).to.be.false;
  expect(checkboxes[0]?.validity.valid).to.be.false;
  expect(checkboxes[1]?.validity.valid).to.be.false;
});
