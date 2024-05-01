import { expect, fixture, html } from '@open-wc/testing';
import Modal from './modal.js';

it('is accessible', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  await expect(element).to.be.accessible();
});

it('focuses the dialog upon opening', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(element.shadowRoot?.activeElement).to.equal(dialogElement);
});

it('sets the tabindex on the dialog to "-1"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.getAttribute('tabindex')).to.equal('-1');
});

it('sets the "toolbar" role on the header-actions section', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const toolbar =
    element.shadowRoot!.querySelector<HTMLDialogElement>('[role="toolbar"');
  expect(toolbar).to.be.ok;
});

it('sets proper aria attributes and roles on the article', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const content =
    element.shadowRoot!.querySelector<HTMLDialogElement>('[role="region"');

  expect(content).to.be.ok;
  expect(content?.tagName).to.equal('ARTICLE');
  expect(content?.getAttribute('aria-labelledby')).to.equal('heading');
  expect(content?.getAttribute('tabindex')).to.equal('0');

  // Verify the aria-labelledby id attribute is found
  const label =
    element.shadowRoot!.querySelector<HTMLHeadingElement>('#heading');
  expect(label).to.be.ok;
  expect(label?.tagName).to.equal('H2');
});
