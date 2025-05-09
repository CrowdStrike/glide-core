import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import Accordion from './accordion.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends Accordion {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-accordion')).to.equal(Accordion);
});

it('is accessible', async () => {
  const host = await fixture<Accordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-accordion>Content</glide-core-accordion>`);
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

it('throws if its default slot is empty', async () => {
  await expectUnhandledRejection(() => {
    return fixture<Accordion>(
      html`<glide-core-accordion label="Label"></glide-core-accordion>`,
    );
  });
});

it('`#onPrefixIconSlotChange` coverage', async () => {
  await fixture<Accordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="prefix-icon"></div>
    </glide-core-accordion>`,
  );
});

it('`#onSuffixIconsSlotChange` coverage', async () => {
  await fixture<Accordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="suffix-icons"></div>
    </glide-core-accordion>`,
  );
});
