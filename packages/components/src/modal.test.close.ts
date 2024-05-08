import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import Modal from './modal.js';
import sinon from 'sinon';

Modal.shadowRootOptions.mode = 'open';

it('closes the modal when the close button is clicked', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
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
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');
  expect(dialogElement?.hasAttribute('open')).to.be.true;

  await sendKeys({ press: 'Escape' });

  expect(dialogElement?.hasAttribute('open')).to.be.false;
});

it('closes the modal via "show-back-button"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" show-back-button></cs-modal>`,
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

it('does not emit a "close" event when clicking inside the dialog and the mouse is not positioned on a "close" button', async () => {
  const spy = sinon.spy();
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );
  element.showModal();
  element.addEventListener('close', spy);
  const dialogElement = element?.shadowRoot?.querySelector('dialog');
  const boundingRectangle = dialogElement?.getBoundingClientRect();

  expect(boundingRectangle).is.not.null;

  const { top, left } = boundingRectangle!;
  await sendMouse({
    type: 'click',
    position: [Math.ceil(left + 1), Math.ceil(top + 1)],
  });

  expect(spy.notCalled).to.be.true;
});

it('emits a "close" event when clicking outside the dialog and removes class "glide-lock-scroll" from document', async () => {
  const spy = sinon.spy();
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );
  element.showModal();
  element.addEventListener('close', spy);
  const dialogElement = element?.shadowRoot?.querySelector('dialog');
  const boundingRectangle = dialogElement?.getBoundingClientRect();

  expect(boundingRectangle).is.not.null;
  expect(document.documentElement.classList.contains('glide-lock-scroll')).to.be
    .true;

  const { top, left } = boundingRectangle!;
  await sendMouse({
    type: 'click',
    position: [Math.floor(left - 1), Math.floor(top - 1)],
  });

  expect(spy.called).to.be.true;
  expect(document.documentElement.classList.contains('glide-lock-scroll')).to.be
    .false;
});
