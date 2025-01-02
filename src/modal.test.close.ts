/* eslint-disable @typescript-eslint/no-unused-expressions */

import { click } from './library/mouse.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('closes the modal when the close button is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  await click(
    component.shadowRoot?.querySelector('[data-test="close-button"]'),
  );

  expect(
    component
      .shadowRoot!.querySelector<HTMLDialogElement>('dialog')
      ?.hasAttribute('open'),
  ).to.be.false;
});

it('closes the modal when the escape key is pressed', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const dialogElement =
    component.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  await sendKeys({ press: 'Escape' });
  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('closes the modal via "back-button"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button>
      Content
    </glide-core-modal>`,
  );

  component.showModal();

  const dialogElement = component.shadowRoot?.querySelector('dialog');
  expect(dialogElement?.hasAttribute('open')).to.be.true;

  await click(component.shadowRoot?.querySelector('[data-test="back-button"]'));
  expect(dialogElement?.hasAttribute('open')).to.be.false;
});
