import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalIconButton from './modal.icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

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
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-modal-icon-button></glide-core-modal-icon-button>`,
    );
  });
});
