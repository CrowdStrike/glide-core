import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreDrawer from './drawer.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreDrawer {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-drawer')).to.equal(
    GlideCoreDrawer,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  await expect(component).to.be.accessible();
});

it('opens', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
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

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-drawer></glide-core-drawer>`);
  });
});
