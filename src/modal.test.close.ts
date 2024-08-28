/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('closes the modal when the close button is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const button = component.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

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

it('closes the modal via "show-back-button"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" show-back-button>
      Content
    </glide-core-modal>`,
  );

  component.showModal();

  const dialogElement =
    component.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  const button = component.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});
