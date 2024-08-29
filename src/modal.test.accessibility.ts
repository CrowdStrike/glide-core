/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  await expect(component).to.be.accessible();
});

it('focuses the dialog upon opening', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const dialogElement = component.shadowRoot?.querySelector('dialog');

  expect(component.shadowRoot?.activeElement).to.equal(dialogElement);
});

it('sets the tabindex on the dialog to "-1"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const dialogElement =
    component.shadowRoot?.querySelector<HTMLDialogElement>('dialog');

  expect(dialogElement?.getAttribute('tabindex')).to.equal('-1');
});

it('sets the "toolbar" role on the header-actions section', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const toolbar =
    component.shadowRoot?.querySelector<HTMLDialogElement>('[role="toolbar"');

  expect(toolbar).to.be.ok;
});

it('sets proper aria attributes and roles on the article', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const content =
    component.shadowRoot?.querySelector<HTMLDialogElement>('[role="region"');

  expect(content).to.be.ok;
  expect(content?.tagName).to.equal('ARTICLE');
  expect(content?.getAttribute('aria-labelledby')).to.equal('heading');
  expect(content?.getAttribute('tabindex')).to.equal('0');

  const label = component.shadowRoot?.querySelector<HTMLElement>('#heading');

  expect(label).to.be.ok;
  expect(label?.tagName).to.equal('H2');
});
