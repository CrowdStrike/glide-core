import './checkbox.js';
import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreFormControlsLayout from './form-controls-layout.js';

it('sets `privateActive` on each control when `split` is set programmatically', async () => {
  const host = await fixture<GlideCoreFormControlsLayout>(html`
    <glide-core-form-controls-layout>
      <glide-core-input label="Label"></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-controls-layout>
  `);

  host.split = 'middle';

  const input = host.querySelector('glide-core-input');
  const checkbox = host.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('middle');
  expect(checkbox?.privateSplit).to.equal('middle');
});
