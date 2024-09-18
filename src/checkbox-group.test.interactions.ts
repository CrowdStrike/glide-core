/* eslint-disable @typescript-eslint/no-unused-expressions */

import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('checks and unchecks Checkboxes when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>

      <glide-core-checkbox
        label="Two"
        value="two"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.value = ['one'];

  const checkboxes = component.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0].checked).to.be.true;
  expect(checkboxes[1].checked).to.be.false;
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

  expect(component.value).to.deep.equal(['three', 'two']);
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

  expect(component.value).to.deep.equal(['two']);
});
