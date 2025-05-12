import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Textarea from './textarea.js';

@customElement('glide-core-subclassed')
class Subclassed extends Textarea {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-textarea')).to.equal(Textarea);
});

it('is accessible', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      value="value"
      label="Label"
    ></glide-core-textarea>`,
  );

  await expect(host).to.be.accessible();
});

it('has a character count for screenreaders', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      maxlength="10"
    ></glide-core-textarea>`,
  );

  const maxCharacterCountAnnouncement = host.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal(
    'Character count 0 of 10',
  );
});

it('has a character count when `maxlength` is greater than zero', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea value="value" label="Label" maxlength="10"
      ><span slot="description">Description</span></glide-core-textarea
    >`,
  );

  const container = host.shadowRoot!.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(container?.textContent?.trim()).to.equal('5/10');
});

it('does not have a character count when `maxlength` is less than zero', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      maxlength="0"
    ></glide-core-textarea>`,
  );

  const container = host.shadowRoot?.querySelector(
    '[data-test="character-count-container"]',
  );

  expect(container).to.be.null;
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-textarea></glide-core-textarea>`);
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
