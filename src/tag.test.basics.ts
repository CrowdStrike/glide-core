import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTag from './tag.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTag {}

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

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
