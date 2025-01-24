import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreInput from './input.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-input')).to.equal(
    GlideCoreInput,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Label" value="value"></glide-core-input>
  `);

  await expect(component).to.be.accessible();
});

it('has a search icon', async () => {
  const component = await fixture(html`
    <glide-core-input label="Label" type="search"></glide-core-input>
  `);

  const icon = component.shadowRoot?.querySelector('[data-test="search-icon"]');
  expect(icon?.checkVisibility()).to.be.true;
});

it('has a max character and current character count', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const maxCharacterCountText = component.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.equal('0/5');
});

it('has a character count for screenreaders', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="5"></glide-core-input>
  `);

  const characterCount = component.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(characterCount?.textContent?.trim()).to.equal(
    'Character count 0 of 5',
  );
});

it('has no character count when attribute `maxlength` is set less than zero', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test label" maxlength="0"></glide-core-input>
  `);

  const container = component.shadowRoot?.querySelector(
    '[data-test="character-count-container"]',
  );

  expect(container?.checkVisibility()).to.be.not.ok;
});

it('has `this.readonly && !this.disabled` coverage', async () => {
  await fixture(html`
    <glide-core-input label="Label" readonly></glide-core-input>
  `);
});
