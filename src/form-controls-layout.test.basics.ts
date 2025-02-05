import './checkbox.js';
import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreFormControlsLayout from './form-controls-layout.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreFormControlsLayout {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-form-controls-layout')).to.equal(
    GlideCoreFormControlsLayout,
  );
});

it('sets `privateActive` on each control', async () => {
  const host = await fixture<GlideCoreFormControlsLayout>(html`
    <glide-core-form-controls-layout>
      <glide-core-input label="Label"></glide-core-input>

      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-form-controls-layout>
  `);

  const input = host.querySelector('glide-core-input');
  const checkbox = host.querySelector('glide-core-checkbox');

  expect(input?.privateSplit).to.equal('left');
  expect(checkbox?.privateSplit).to.equal('left');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
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
          orientation="vertical"
        ></glide-core-input>
      </glide-core-form-controls-layout>
    `);
  });
});
