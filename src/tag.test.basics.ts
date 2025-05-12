import { assert, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Tag from './tag.js';

@customElement('glide-core-subclassed')
class Subclassed extends Tag {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tag')).to.equal(Tag);
});

it('is accessible', async () => {
  const host = await fixture<Tag>(
    html`<glide-core-tag label="Label"></glide-core-tag>`,
  );

  let animation: Animation | undefined;

  // Tag animates its opacity when added to the page. We wait for the animation
  // to complete to avoid a color contrast violation.
  await waitUntil(() => {
    animation = host.shadowRoot
      ?.querySelector('[data-test="component"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  assert(animation);
  await animation.finished;

  await expect(host).to.be.accessible();

  host.removable = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('can be removable', async () => {
  const host = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="removal-button"]');

  expect(button?.checkVisibility()).to.be.true;
  expect(button?.ariaLabel).to.equal('Remove tag: Label');
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tag></glide-core-tag>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
