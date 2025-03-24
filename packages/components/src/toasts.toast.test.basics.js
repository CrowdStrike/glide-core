var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreToast from './toasts.toast.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreToast {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
// Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-toast')).to.equal(GlideCoreToast);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
    ></glide-core-toast>`);
    await expect(host).to.be.accessible();
});
it('opens and closes', async () => {
    const clock = sinon.useFakeTimers();
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
    ></glide-core-toast>`);
    clock.tick(3000);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    expect(component?.classList.contains('open')).to.be.true;
    clock.tick(3000);
    component?.dispatchEvent(new TransitionEvent('transitionend'));
    expect(component?.classList.contains('closed')).to.be.true;
    clock.restore();
});
it('can have an arbitrary duration', async () => {
    const clock = sinon.useFakeTimers();
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
      duration="10000"
    ></glide-core-toast>`);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    clock.tick(9500);
    expect(component?.classList.contains('open')).to.be.true;
    clock.tick(1000);
    component?.dispatchEvent(new TransitionEvent('transitionend'));
    expect(component?.classList.contains('closed')).to.be.true;
    clock.restore();
});
it('can have an infinite duration', async () => {
    const clock = sinon.useFakeTimers();
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
      duration="Infinity"
    ></glide-core-toast>`);
    clock.tick(9500);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    expect(component?.classList.contains('open')).to.be.true;
    clock.restore();
});
it('has a minimum duration', async () => {
    const clock = sinon.useFakeTimers();
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
      duration="3000"
    ></glide-core-toast>`);
    clock.tick(4000);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    expect(component?.classList.contains('open')).to.be.true;
    clock.restore();
});
it('closes when its close button is clicked', async () => {
    const host = await fixture(html `<glide-core-toast
      variant="informational"
      label="Label"
      description="Description"
    ></glide-core-toast>`);
    const component = host.shadowRoot?.querySelector('[data-test="component"]');
    host.shadowRoot
        ?.querySelector('[data-test="close-button"]')
        ?.click();
    component?.dispatchEvent(new TransitionEvent('transitionend'));
    expect(component?.classList.contains('closed')).to.be.true;
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
