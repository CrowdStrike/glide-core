/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';
import click from './library/click.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

const addSpy = sinon.spy(document.documentElement.classList, 'add');
const removeSpy = sinon.spy(document.documentElement.classList, 'remove');

afterEach(async () => {
  addSpy.resetHistory();
  removeSpy.resetHistory();
});

after(() => {
  addSpy.restore();
  removeSpy.restore();
});

it('adds the "private-glide-core-modal-lock-scroll" class to the documentElement when opened and removes it when closed', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(addSpy.callCount).to.equal(1);
  expect(addSpy.calledWith('private-glide-core-modal-lock-scroll')).to.be.ok;

  expect(removeSpy.callCount).to.equal(0);

  component.close();

  expect(removeSpy.callCount).to.equal(1);
  expect(removeSpy.calledWith('private-glide-core-modal-lock-scroll')).to.be.ok;

  // Verify `add` was not called again for some reason
  expect(addSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the close button is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(removeSpy.callCount).to.equal(0);

  const button = component.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(removeSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the "close" method is called', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(removeSpy.callCount).to.equal(0);

  const dialogElement =
    component.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  component.close();

  expect(removeSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the escape key is pressed', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(removeSpy.callCount).to.equal(0);

  await sendKeys({ press: 'Escape' });

  expect(removeSpy.callCount).to.equal(1);
});

it('removes class "private-glide-core-modal-lock-scroll" from document when click is outside dialog', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.true;

  await click(component?.shadowRoot?.querySelector('dialog'), 'outside');

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.false;
});
