import './modal.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import Modal from './modal.js';
import sinon from 'sinon';

Modal.shadowRootOptions.mode = 'open';

it('dispatches a "close" event when the modal is closed via the "close" method', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );

  element.addEventListener('close', spy);
  element.showModal();

  expect(spy.notCalled).to.be.true;

  element.close();

  expect(spy.called).to.be.true;
});

it('dispatches a "close" event when the modal is closed via the close button', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );

  element.addEventListener('close', spy);
  element.showModal();

  const button = element.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(spy.called).to.be.true;
});

it('dispatches a "close" event when the modal is closed via the escape key', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );

  element.addEventListener('close', spy);
  element.showModal();

  await sendKeys({ press: 'Escape' });

  expect(spy.called).to.be.true;
});

it('does not dispatch a "close" event when the modal is open and non-escape keys are pressed', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">Modal Content</cs-modal>`,
  );

  element.addEventListener('close', spy);

  element.showModal();

  // Tests only a couple keys.
  await sendKeys({ press: ' ' });

  expect(spy.notCalled).to.be.true;

  await sendKeys({ press: 'Enter' });

  expect(spy.notCalled).to.be.true;
});

it('dispatches a "close" event when the modal is closed via "show-back-button"', async () => {
  const spy = sinon.spy();

  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" show-back-button>
      Modal Content
    </cs-modal>`,
  );

  element.addEventListener('close', spy);
  element.showModal();

  const button = element.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(spy.called).to.be.true;
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

it('emits a "close" event when clicking outside the dialog', async () => {
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
    position: [Math.floor(left - 1), Math.floor(top - 1)],
  });

  expect(spy.called).to.be.true;
});
