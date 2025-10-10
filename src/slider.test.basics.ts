import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import Slider from './slider.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends Slider {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-slider')).to.equal(Slider);
});

it('sets a less than 1 `step` to 1', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="0"></glide-core-slider>`,
  );

  expect(host.step).to.equal(1);
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-slider></glide-core-slider>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when split and vertical', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-slider
        label="Label"
        orientation="vertical"
        split="left"
      ></glide-core-slider>`,
    );
  });
});
