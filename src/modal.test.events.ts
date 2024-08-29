/* eslint-disable @typescript-eslint/no-unused-expressions */

import './modal.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';
import sinon from 'sinon';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('dispatches a "close" event when the modal is closed via the "close" method', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('close', spy);
  component.showModal();

  expect(spy.callCount).to.equal(0);

  component.close();

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "close" event when the modal is closed via the close button', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('close', spy);
  component.showModal();

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "close" event when the modal is closed via the escape key', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('close', spy);
  component.showModal();

  await sendKeys({ press: 'Escape' });

  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "close" event when the modal is open and non-escape keys are pressed', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('close', spy);

  component.showModal();

  // Tests only a couple keys.
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "close" event when the modal is closed via "show-back-button"', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" show-back-button>
      Content
    </glide-core-modal>`,
  );

  component.addEventListener('close', spy);
  component.showModal();

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(spy.callCount).to.equal(1);
});

it('does not emit a "close" event when clicking inside the dialog and the mouse is not positioned on a "close" button', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();
  component.addEventListener('close', spy);
  const dialogElement = component?.shadowRoot?.querySelector('dialog');
  const boundingRectangle = dialogElement?.getBoundingClientRect();

  expect(boundingRectangle).is.not.null;

  const { top, left } = boundingRectangle!;

  await sendMouse({
    type: 'click',
    position: [Math.ceil(left + 1), Math.ceil(top + 1)],
  });

  expect(spy.callCount).to.equal(0);
});

it(`does not emit a "close" event if a mousedown event's origin does not come from the dialog component`, async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      <button data-test="target">Inside Body</button>
    </glide-core-modal>`,
  );

  component.showModal();

  component.addEventListener('close', spy);

  const button = component.querySelector<HTMLButtonElement>(
    '[data-test="target"]',
  );

  expect(button).to.be.ok;

  button?.dispatchEvent(new Event('mousedown', { bubbles: true }));

  expect(spy.callCount).to.equal(0);
});

it('emits a "close" event when clicking outside the dialog', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();
  component.addEventListener('close', spy);
  const dialogElement = component?.shadowRoot?.querySelector('dialog');
  const boundingRectangle = dialogElement?.getBoundingClientRect();

  expect(boundingRectangle).is.not.null;

  const { top, left } = boundingRectangle!;

  await sendMouse({
    type: 'click',
    position: [Math.floor(left - 1), Math.floor(top - 1)],
  });

  expect(spy.callCount).to.equal(1);
});
