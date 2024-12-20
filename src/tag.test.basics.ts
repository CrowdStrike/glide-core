/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tag')).to.equal(GlideCoreTag);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label"></glide-core-tag>`,
  );

  // Wait for the animation to complete.
  await aTimeout(100);

  await expect(component).to.be.accessible();

  component.removable = true;
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label"></glide-core-tag>`,
  );

  expect(component.disabled).to.be.false;
  expect(component.removable).to.be.false;
  expect(component.size).to.equal('medium');
});

it('can be removed', async () => {
  const component = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="removal-button"]',
  );

  expect(button?.checkVisibility()).to.be.true;
  expect(button?.getAttribute('aria-label')).to.equal('Remove tag: Label');
});
