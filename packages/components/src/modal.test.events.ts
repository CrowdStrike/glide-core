import './modal.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Modal from './modal.js';

it('dispatches a "close" event when the modal is closed via the "close" method', async () => {
  let hasCloseBeenCalled = false;

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );
  element.addEventListener('close', () => (hasCloseBeenCalled = true));

  element.showModal();
  expect(hasCloseBeenCalled).to.be.false;

  element.close();

  await waitUntil(() => hasCloseBeenCalled === true);

  expect(hasCloseBeenCalled).to.be.true;
});

it('dispatches a "close" event when the modal is closed via the close button', async () => {
  let hasCloseBeenCalled = false;

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.addEventListener('close', () => (hasCloseBeenCalled = true));

  element.showModal();

  const button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );
  expect(button).to.be.ok;

  button?.click();

  await waitUntil(() => hasCloseBeenCalled === true);

  expect(hasCloseBeenCalled).to.be.true;
});

it('dispatches a "close" event when the modal is closed via the escape key', async () => {
  let hasCloseBeenCalled = false;

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.addEventListener('close', () => (hasCloseBeenCalled = true));

  element.showModal();

  await sendKeys({ press: 'Escape' });

  await waitUntil(() => hasCloseBeenCalled === true);

  expect(hasCloseBeenCalled).to.be.true;
});

it('dispatches a "close" event when the modal is closed via "show-back-button"', async () => {
  let hasCloseBeenCalled = false;

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" show-back-button></cs-modal>`,
  );

  element.addEventListener('close', () => (hasCloseBeenCalled = true));

  element.showModal();

  const button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );
  expect(button).to.be.ok;

  button?.click();

  await waitUntil(() => hasCloseBeenCalled === true);

  expect(hasCloseBeenCalled).to.be.true;
});
