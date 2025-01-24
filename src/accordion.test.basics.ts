import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-accordion')).to.equal(
    GlideCoreAccordion,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await expect(component).to.be.accessible();
});

it('throws when its default slot is empty', async () => {
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
