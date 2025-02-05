import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreModalIconButton from './modal.icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreModalIconButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal-icon-button')).to.equal(
    GlideCoreModalIconButton,
  );
});

it('is accessible', async () => {
  const host = await fixture(
    html`<glide-core-modal-icon-button>Content</glide-core-modal-icon-button>`,
  );

  await expect(host).to.be.accessible();
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
    return fixture(
      html`<glide-core-modal-icon-button></glide-core-modal-icon-button>`,
    );
  });
});
