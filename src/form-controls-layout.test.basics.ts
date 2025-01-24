import './checkbox.js';
import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreFormControlsLayout from './form-controls-layout.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-form-controls-layout')).to.equal(
    GlideCoreFormControlsLayout,
  );
});

it('sets `privateActive` on each control', async () => {
  const component = await fixture<GlideCoreFormControlsLayout>(html`
    <glide-core-form-controls-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-controls-layout>
  `);

  const input = component.querySelector('glide-core-input');
  const checkbox = component.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('left');
  expect(checkbox?.privateSplit).to.equal('left');
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`
      <glide-core-form-controls-layout></glide-core-form-controls-layout>
    `);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-form-controls-layout>
        <input />
      </glide-core-form-controls-layout>
    `);
  });
});

it('throws if a vertical control is present', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-form-controls-layout>
        <glide-core-input
          label="Label"
          placeholder="Placeholder"
          orientation="vertical"
        ></glide-core-input>
      </glide-core-form-controls-layout>
    `);
  });
});
