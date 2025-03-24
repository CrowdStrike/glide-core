var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreInput from './input.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreInput {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-input')).to.equal(GlideCoreInput);
});
it('is accessible', async () => {
    const host = await fixture(html `
    <glide-core-input label="Label" value="value"></glide-core-input>
  `);
    await expect(host).to.be.accessible();
});
it('has a search icon', async () => {
    const host = await fixture(html `
    <glide-core-input label="Label" type="search"></glide-core-input>
  `);
    const icon = host.shadowRoot?.querySelector('[data-test="search-icon"]');
    expect(icon?.checkVisibility()).to.be.true;
});
it('has a max character and current character count', async () => {
    const host = await fixture(html `
    <glide-core-input label="Label" maxlength="5"></glide-core-input>
  `);
    const maxCharacterCountText = host.shadowRoot?.querySelector('[data-test="character-count-text"]');
    expect(maxCharacterCountText?.textContent?.trim()).to.equal('0/5');
});
it('has no character count when `maxlength` is zero', async () => {
    const host = await fixture(html `
    <glide-core-input label="Label" maxlength="0"></glide-core-input>
  `);
    const container = host.shadowRoot?.querySelector('[data-test="character-count-container"]');
    expect(container?.checkVisibility()).to.be.not.ok;
});
it('has a character count for screenreaders', async () => {
    const host = await fixture(html `
    <glide-core-input label="Label" maxlength="5"></glide-core-input>
  `);
    const characterCount = host.shadowRoot?.querySelector('[data-test="character-count-announcement"]');
    expect(characterCount?.textContent?.trim()).to.equal('Character count 0 of 5');
});
it('has `this.readonly && !this.disabled` coverage', async () => {
    await fixture(html `
    <glide-core-input label="Label" readonly></glide-core-input>
  `);
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-input></glide-core-input>`);
    }
    catch {
        spy();
    }
    expect(spy.callCount).to.equal(1);
});
it('throws when subclassed', async () => {
    const spy = sinon.spy();
    try {
        new GlideCoreSubclassed();
    }
    catch {
        spy();
    }
    expect(spy.callCount).to.equal(1);
});
