var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTextarea from './textarea.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreTextarea {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-textarea')).to.equal(GlideCoreTextarea);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-textarea
      value="value"
      label="Label"
    ></glide-core-textarea>`);
    await expect(host).to.be.accessible();
});
it('has a character count for screenreaders', async () => {
    const host = await fixture(html `<glide-core-textarea
      label="Label"
      maxlength="10"
    ></glide-core-textarea>`);
    const maxCharacterCountAnnouncement = host.shadowRoot?.querySelector('[data-test="character-count-announcement"]');
    expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal('Character count 0 of 10');
});
it('has a character count when `maxlength` is greater than zero', async () => {
    const host = await fixture(html `<glide-core-textarea value="value" label="Label" maxlength="10"
      ><span slot="description">Description</span></glide-core-textarea
    >`);
    const container = host.shadowRoot.querySelector('[data-test="character-count-text"]');
    expect(container?.textContent?.trim()).to.be.equal('5/10');
});
it('does not have a character count when `maxlength` is less than zero', async () => {
    const host = await fixture(html `<glide-core-textarea
      label="Label"
      maxlength="0"
    ></glide-core-textarea>`);
    const container = host.shadowRoot?.querySelector('[data-test="character-count-container"]');
    expect(container).to.be.null;
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-textarea></glide-core-textarea>`);
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
