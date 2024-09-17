/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonContainerButton from './split-button-container.button.js';

GlideCoreSplitButtonContainerButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(
    window.customElements.get('glide-core-split-button-container-button'),
  ).to.equal(GlideCoreSplitButtonContainerButton);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonContainerButton>(html`
    <glide-core-split-button-container-button
      label="Label"
    ></glide-core-split-button-container-button>
  `);

  await expect(component).to.be.accessible();

  component.privateDisabled = true;
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButtonContainerButton>(html`
    <glide-core-split-button-container-button
      label="Label"
    ></glide-core-split-button-container-button>
  `);

  expect(component.ariaControls).to.be.null;
  expect(component.ariaExpanded).to.be.null;
  expect(component.ariaHasPopup).to.be.null;
  expect(component.privateDisabled).to.be.false;
  expect(component.privateSize).to.be.equal('large');
  expect(component.privateVariant).to.be.equal('primary');
});
