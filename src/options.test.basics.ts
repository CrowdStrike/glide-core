import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import Options from './options.js';
import expectWindowError from '@/src/library/expect-window-error.js';

customElement('glide-core-subclassed');
class Subclassed extends Options {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-options')).to.equal(Options);
});

it('shows loading feedback', async () => {
  const host = await fixture<Options>(
    html`<glide-core-options></glide-core-options>`,
  );

  host.privateLoading = true;
  await host.updateComplete;

  const feedback = host?.shadowRoot?.querySelector(
    '[data-test="loading-feedback"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-options>
        <option>Option</option>
      </glide-core-options>`,
    );
  });
});
