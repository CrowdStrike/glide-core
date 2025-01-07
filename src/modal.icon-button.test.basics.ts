import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalIconButton from './modal.icon-button.js';
import sinon from 'sinon';

GlideCoreModalIconButton.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal-icon-button')).to.equal(
    GlideCoreModalIconButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal-icon-button>Content</glide-core-modal-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-modal-icon-button></glide-core-modal-icon-button>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
