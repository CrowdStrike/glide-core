import './checkbox.js';
import './input.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreFormLayout from './form-layout.js';

it('sets `privateActive` on each control when `split` is changed programmatically', async () => {
  const component = await fixture<GlideCoreFormLayout>(html`
    <glide-core-form-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-layout>
  `);

  // TODO: no idea why
  await waitUntil(() => component instanceof GlideCoreFormLayout);

  component.split = 'middle';

  const input = component.querySelector('glide-core-input');
  const checkbox = component.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('middle');
  expect(checkbox?.privateSplit).to.equal('middle');
});
