import { expect, fixture, html } from '@open-wc/testing';
import Modal from './modal.js';

Modal.shadowRootOptions.mode = 'open';

it('opens the modal when the "showModal" method is called and closes it when "close" is called', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const dialogElement = element.shadowRoot?.querySelector('dialog');
  expect(dialogElement?.hasAttribute('open')).to.be.true;

  element.close();

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('remains open when the "showModal" method is called twice', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const dialogElement = element.shadowRoot?.querySelector('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  element.showModal();

  expect(dialogElement?.hasAttribute('open')).to.be.true;
});
