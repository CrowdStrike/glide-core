import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('opens the modal when the "showModal" method is called and closes it when "close" is called', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement = element.shadowRoot?.querySelector('dialog');
  expect(dialogElement?.hasAttribute('open')).to.be.true;

  element.close();

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('remains open when the "showModal" method is called twice', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement = element.shadowRoot?.querySelector('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  element.showModal();

  expect(dialogElement?.hasAttribute('open')).to.be.true;
});
