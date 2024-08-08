import './checkbox.js';
import './input.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreFormControlsLayout from './form-controls-layout.js';

it('sets `privateActive` on each control when `split` is changed programmatically', async () => {
  const component = await fixture<GlideCoreFormControlsLayout>(html`
    <glide-core-form-controls-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-controls-layout>
  `);

  // Why isn't it a `GlideCoreFormControlsLayout` instance yet? No idea!
  // It should be fully rendered by this point. Nothing to do with the
  // component itself, which is quite simple. And no other test behaves
  // like this.
  await waitUntil(() => component instanceof GlideCoreFormControlsLayout);

  component.split = 'middle';

  const input = component.querySelector('glide-core-input');
  const checkbox = component.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('middle');
  expect(checkbox?.privateSplit).to.equal('middle');
});
