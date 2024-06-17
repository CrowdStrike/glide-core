import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

const addSpy = sinon.spy(document.documentElement.classList, 'add');
const removeSpy = sinon.spy(document.documentElement.classList, 'remove');

afterEach(() => {
  addSpy.resetHistory();
  removeSpy.resetHistory();
});

after(() => {
  addSpy.restore();
  removeSpy.restore();
});

it('adds the "private-glide-core-modal-lock-scroll" class to the documentElement when opened and removes it when closed', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title"
      >Modal Content</glide-core-modal
    >`,
  );

  element.showModal();

  expect(addSpy.callCount).to.equal(1);
  expect(addSpy.calledWith('private-glide-core-modal-lock-scroll')).to.be.ok;

  expect(removeSpy.callCount).to.equal(0);

  element.close();

  expect(removeSpy.callCount).to.equal(1);
  expect(removeSpy.calledWith('private-glide-core-modal-lock-scroll')).to.be.ok;

  // Verify `add` was not called again for some reason
  expect(addSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the close button is clicked', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title"
      >Modal Content</glide-core-modal
    >`,
  );

  element.showModal();

  expect(removeSpy.callCount).to.equal(0);

  const button = element.shadowRoot!.querySelector<HTMLButtonElement>(
    '[data-test="close-button"]',
  );

  expect(button).to.be.ok;

  button?.click();

  expect(removeSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the "close" method is called', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title"
      >Modal Content</glide-core-modal
    >`,
  );

  element.showModal();

  expect(removeSpy.callCount).to.equal(0);

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.hasAttribute('open')).to.be.true;

  element.close();

  expect(removeSpy.callCount).to.equal(1);
});

it('removes the "private-glide-core-modal-lock-scroll" class when the escape key is pressed', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title"
      >Modal Content</glide-core-modal
    >`,
  );

  element.showModal();

  expect(removeSpy.callCount).to.equal(0);

  await sendKeys({ press: 'Escape' });

  expect(removeSpy.callCount).to.equal(1);
});

it('removes class "private-glide-core-modal-lock-scroll" from document when click is outside dialog', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title"
      >Modal Content</glide-core-modal
    >`,
  );

  element.showModal();
  const dialogElement = element?.shadowRoot?.querySelector('dialog');
  const boundingRectangle = dialogElement?.getBoundingClientRect();

  expect(boundingRectangle).is.not.null;

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.true;

  const { top, left } = boundingRectangle!;

  await sendMouse({
    type: 'click',
    position: [Math.floor(left - 1), Math.floor(top - 1)],
  });

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.false;
});
