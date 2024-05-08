import './modal.js';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Modal from './modal.js';
import sinon from 'sinon';

Modal.shadowRootOptions.mode = 'open';

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

it('does not dispatch a "close" event when the modal is open and non-escape keys are pressed', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.addEventListener('close', spy);

  element.showModal();

  // Tests only a couple keys. If there are special cases that arise in future we can test them at that time.
  await sendKeys({ press: ' ' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;

  await sendKeys({ press: 'Enter' });
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
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
