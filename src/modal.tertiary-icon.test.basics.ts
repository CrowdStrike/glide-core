import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

GlideCoreModalTertiaryIcon.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal-tertiary-icon')).to.equal(
    GlideCoreModalTertiaryIcon,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon>
      Content
    </glide-core-modal-tertiary-icon>`,
  );

  await expect(component).to.be.accessible();
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-modal-tertiary-icon></glide-core-modal-tertiary-icon>`,
    );
  });
});
