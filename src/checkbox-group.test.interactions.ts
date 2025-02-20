import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';

it('checks and unchecks checkboxes when `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" checked></glide-core-checkbox>

      <glide-core-checkbox
        label="Three"
        value="three"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  host.value = ['one'];

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0]?.checked).to.be.true;
  expect(checkboxes[1]?.checked).to.be.true;
  expect(checkboxes[2]?.checked).to.be.false;
});

it('updates `value` when the `value` of its checkbox is set programmatically', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
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

  const checkbox = host.querySelector('glide-core-checkbox');
  assert(checkbox);
  checkbox.value = 'three';

  await host.updateComplete;

  expect(host.value).to.deep.equal(['three', 'two']);
  expect(host.getAttribute('value')).to.equal('["three","two"]');
});

it('updates `value` when the `value` of its checkbox is emptied programmatically', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
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

  const checkbox = host.querySelector('glide-core-checkbox');
  assert(checkbox);
  checkbox.value = '';

  await host.updateComplete;

  expect(host.value).to.deep.equal(['two']);
  expect(host.getAttribute('value')).to.equal('["two"]');
});

it('enables disabled checkboxes when `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
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

  host.value = ['one', 'two'];

  const checkbox = host.querySelector('glide-core-checkbox');
  expect(checkbox?.disabled).to.be.false;
});

it('can be disabled programmatically', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="One"></glide-core-checkbox>
      <glide-core-checkbox label="Two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  host.disabled = true;
  await host.updateComplete;

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  expect(checkboxes[0]?.disabled).to.be.true;
  expect(checkboxes[1]?.disabled).to.be.true;

  expect(host.hasAttribute('disabled')).to.be.true;
  expect(host.disabled).to.be.true;
});

it('adds values to `value` in the order they were selected or deselected', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
      <glide-core-checkbox label="Three" value="three"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  const checkboxes = host.querySelectorAll('glide-core-checkbox');

  await click(checkboxes[1]);
  await click(checkboxes[2]);
  await click(checkboxes[0]);
  expect(host.value).to.deep.equal(['two', 'three', 'one']);

  await click(checkboxes[2]);
  expect(host.value).to.deep.equal(['two', 'one']);

  await click(checkboxes[2]);
  expect(host.value).to.deep.equal(['two', 'one', 'three']);
});
