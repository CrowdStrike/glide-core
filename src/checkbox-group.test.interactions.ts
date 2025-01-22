import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';

it('checks and unchecks checkboxes when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" checked></glide-core-checkbox>

      <glide-core-checkbox
        label="Three"
        value="three"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.value = ['one'];

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0].checked).to.be.true;
  expect(checkboxes[1].checked).to.be.true;
  expect(checkboxes[2].checked).to.be.false;
});

it('updates `value` when the `value` of a checked Checkbox is changed programmatically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
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
  );

  const checkbox = component.querySelector('glide-core-checkbox');
  assert(checkbox);
  checkbox.value = 'three';

  await component.updateComplete;

  expect(component.value).to.deep.equal(['three', 'two']);
  expect(component.getAttribute('value')).to.equal('["three","two"]');
});

it('updates `value` when the `value` of a checked Checkbox is emptied programmatically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
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
  );

  const checkbox = component.querySelector('glide-core-checkbox');
  assert(checkbox);
  checkbox.value = '';

  await component.updateComplete;

  expect(component.value).to.deep.equal(['two']);
  expect(component.getAttribute('value')).to.equal('["two"]');
});

it('enables disabled checkboxes when `value` is set programmatically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox
        label="One"
        value="one"
        disabled
      ></glide-core-checkbox>

      <glide-core-checkbox
        label="Two"
        value="two"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.value = ['one', 'two'];

  const checkbox = component.querySelector('glide-core-checkbox');
  expect(checkbox?.disabled).to.be.false;
});

it('can be disabled dynamically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One"></glide-core-checkbox>
      <glide-core-checkbox label="Two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.disabled = true;
  await component.updateComplete;

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0].disabled).to.be.true;
  expect(checkboxes[1].disabled).to.be.true;

  expect(component.hasAttribute('disabled')).to.be.true;
  expect(component.disabled).to.be.true;
});

it('adds values to `value` in the order they were selected or deselected', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
      <glide-core-checkbox label="Three" value="three"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  await click(checkboxes[1]);
  await click(checkboxes[2]);
  await click(checkboxes[0]);
  expect(component.value).to.deep.equal(['two', 'three', 'one']);

  await click(checkboxes[2]);
  expect(component.value).to.deep.equal(['two', 'one']);

  await click(checkboxes[2]);
  expect(component.value).to.deep.equal(['two', 'one', 'three']);
});
