import './checkbox.js';
import './input.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreFormLayout from './form-layout.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

it('registers', async () => {
  expect(window.customElements.get('glide-core-form-layout')).to.equal(
    GlideCoreFormLayout,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreFormLayout>(html`
    <glide-core-form-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>
    </glide-core-form-layout>
  `);

  expect(component.getAttribute('split')).to.equal('left');
  expect(component.split).to.equal('left');
});

it('sets `privateActive` on each control', async () => {
  const component = await fixture<GlideCoreFormLayout>(html`
    <glide-core-form-layout>
      <glide-core-input
        label="Label"
        placeholder="Placeholder"
      ></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-layout>
  `);

  const input = component.querySelector('glide-core-input');
  const checkbox = component.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('left');
  expect(checkbox?.privateSplit).to.equal('left');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreFormLayout>(html`
      <glide-core-form-layout></glide-core-form-layout>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if its default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-form-layout>
        <input />
      </glide-core-form-layout>
    `);
  });
});
