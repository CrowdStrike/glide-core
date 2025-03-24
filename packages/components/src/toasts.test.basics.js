var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreToasts from './toasts.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreToasts {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-toasts')).to.equal(GlideCoreToasts);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-toasts></glide-core-toasts>`);
    host.add({
        label: 'Label',
        description: 'Description',
        variant: 'informational',
    });
    await expect(host).to.be.accessible();
});
it('is hidden unless there are toasts displayed', async () => {
    const host = await fixture(html `<glide-core-toasts></glide-core-toasts>`);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    expect(component?.checkVisibility()).to.not.be.ok;
    host.add({
        label: 'Label',
        description: 'Description',
        variant: 'informational',
    });
    expect(component?.checkVisibility()).to.be.true;
    const toast = host.shadowRoot?.querySelector('glide-core-toast');
    toast?.close();
    toast?.dispatchEvent(new Event('close', { bubbles: true }));
    expect(component?.checkVisibility()).to.not.be.ok;
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
