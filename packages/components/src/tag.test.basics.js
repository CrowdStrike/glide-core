var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTag from './tag.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreTag {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-tag')).to.equal(GlideCoreTag);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-tag label="Label"></glide-core-tag>`);
    const tag = host?.shadowRoot?.querySelector('[data-test="component"]');
    assert(tag);
    const timeout = tag.dataset.animationDuration;
    assert(timeout);
    // Tag animates its opacity when added to the page. We wait for the animation
    // to complete to avoid a color contrast violation.
    await aTimeout(Number(timeout));
    await expect(host).to.be.accessible();
    host.removable = true;
    await host.updateComplete;
    await expect(host).to.be.accessible();
});
it('can be removable', async () => {
    const host = await fixture(html `<glide-core-tag label="Label" removable></glide-core-tag>`);
    const button = host.shadowRoot?.querySelector('[data-test="removal-button"]');
    expect(button?.checkVisibility()).to.be.true;
    expect(button?.ariaLabel).to.equal('Remove tag: Label');
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-tag></glide-core-tag>`);
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
