import './checkbox.js';
import './input.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreFormControlsLayout from './form-controls-layout.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

it('registers', async () => {
  expect(
    globalThis.customElements.get('glide-core-form-controls-layout'),
  ).to.equal(GlideCoreFormControlsLayout);
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreFormControlsLayout>(html`
    <glide-core-form-controls-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>
    </glide-core-form-controls-layout>
  `);

  expect(component.getAttribute('split')).to.equal('left');
  expect(component.split).to.equal('left');
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
  const spy = sinon.spy();

  try {
    await fixture(html`
      <glide-core-form-controls-layout></glide-core-form-controls-layout>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if its default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-form-controls-layout>
        <input />
      </glide-core-form-controls-layout>
    `);
  });
});

it('throws if a vertical control is present', async () => {
  await expectArgumentError(() => {
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
