import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tag')).to.equal(GlideCoreTag);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label"></glide-core-tag>`,
  );

  const tag = component?.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  );

  assert(tag);

  const timeout = tag.dataset.animationDuration;
  assert(timeout);

  // Tag animates its opacity when added to the page. We wait for the animation
  // to complete to avoid a color contrast violation.
  await aTimeout(Number(timeout));

  await expect(component).to.be.accessible();

  component.removable = true;
  await component.updateComplete;

  await expect(component).to.be.accessible();
});

it('can be removable', async () => {
  const component = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="removal-button"]',
  );

  expect(button?.checkVisibility()).to.be.true;
  expect(button?.ariaLabel).to.equal('Remove tag: Label');
});
