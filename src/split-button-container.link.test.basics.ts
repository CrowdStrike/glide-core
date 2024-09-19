/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonContainerLink from './split-button-container.link.js';

GlideCoreSplitButtonContainerLink.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(
    window.customElements.get('glide-core-split-button-container-link'),
  ).to.equal(GlideCoreSplitButtonContainerLink);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonContainerLink>(html`
    <glide-core-split-button-container-link
      label="Label"
      url="/"
    ></glide-core-split-button-container-link>
  `);

  await expect(component).to.be.accessible();

  component.privateDisabled = true;
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonContainerLink>(html`
    <glide-core-split-button-container-link
      label="Label"
      url="/"
    ></glide-core-split-button-container-link>
  `);

  expect(component.privateDisabled).to.be.false;
  expect(component.privateSize).to.be.equal('large');
  expect(component.privateVariant).to.be.equal('primary');
});
