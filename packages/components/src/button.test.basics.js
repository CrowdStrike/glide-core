var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import GlideCoreButton from './button.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreButton {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-button')).to.equal(GlideCoreButton);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-button label="Label"></glide-core-button>`);
    await expect(host).to.be.accessible();
});
it('has `#onPrefixIconSlotChange` coverage', async () => {
    await fixture(html `
    <glide-core-button label="Label">
      <span slot="prefix-icon">Prefix</span>
    </glide-core-button>
  `);
});
it('has `#onSuffixIconSlotChange` coverage', async () => {
    await fixture(html `
    <glide-core-button label="Label">
      <span slot="suffix-icon">Suffix</span>
    </glide-core-button>
  `);
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-button></glide-core-button>`);
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
