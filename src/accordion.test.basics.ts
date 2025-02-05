import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreAccordion from './accordion.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreAccordion {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-accordion')).to.equal(
    GlideCoreAccordion,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await expect(host).to.be.accessible();
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

it('throws if its default slot is empty', async () => {
  await expectUnhandledRejection(() => {
    return fixture<GlideCoreAccordion>(
      html`<glide-core-accordion label="Label"></glide-core-accordion>`,
    );
  });
});

it('`#onPrefixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="prefix-icon"></div>
    </glide-core-accordion>`,
  );
});

it('`#onSuffixIconsSlotChange` coverage', async () => {
  await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="suffix-icons"></div>
    </glide-core-accordion>`,
  );
});
