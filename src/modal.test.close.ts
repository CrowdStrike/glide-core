/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('closes the modal when the close button is clicked', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(
    element
      .shadowRoot!.querySelector<HTMLDialogElement>('dialog')
      ?.hasAttribute('open'),
  ).to.be.false;
});

it('closes the modal when the escape key is pressed', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  await sendKeys({ press: 'Escape' });

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('closes the modal via "show-back-button"', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title" show-back-button>
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  const button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});
