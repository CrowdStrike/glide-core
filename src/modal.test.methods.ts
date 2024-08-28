/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('opens the modal when the "showModal" method is called and closes it when "close" is called', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const dialogElement = component.shadowRoot?.querySelector('dialog');
  expect(dialogElement?.hasAttribute('open')).to.be.true;

  component.close();

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('remains open when the "showModal" method is called twice', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const dialogElement = component.shadowRoot?.querySelector('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  component.showModal();

  expect(dialogElement?.hasAttribute('open')).to.be.true;
});
