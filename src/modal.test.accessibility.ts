/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('is accessible', async () => {
  const element = await fixture(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  await expect(element).to.be.accessible();
});

it('focuses the dialog upon opening', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement = element.shadowRoot?.querySelector('dialog');

  expect(element.shadowRoot?.activeElement).to.equal(dialogElement);
});

it('sets the tabindex on the dialog to "-1"', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const dialogElement =
    element.shadowRoot?.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.getAttribute('tabindex')).to.equal('-1');
});

it('sets the "toolbar" role on the header-actions section', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const toolbar =
    element.shadowRoot?.querySelector<HTMLDialogElement>('[role="toolbar"');

  expect(toolbar).to.be.ok;
});

it('sets proper aria attributes and roles on the article', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  const content =
    element.shadowRoot?.querySelector<HTMLDialogElement>('[role="region"');

  expect(content).to.be.ok;
  expect(content?.tagName).to.equal('ARTICLE');
  expect(content?.getAttribute('aria-labelledby')).to.equal('heading');
  expect(content?.getAttribute('tabindex')).to.equal('0');

  // Verify the aria-labelledby id attribute is found
  const label =
    element.shadowRoot?.querySelector<HTMLHeadingElement>('#heading');

  expect(label).to.be.ok;
  expect(label?.tagName).to.equal('H2');
});
