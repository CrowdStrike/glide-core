var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreModalIconButton from './modal.icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreModalIconButton {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-modal-icon-button')).to.equal(GlideCoreModalIconButton);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-modal-icon-button label="Label">
      Content
    </glide-core-modal-icon-button>`);
    await expect(host).to.be.accessible();
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-modal-icon-button>
        Content
      </glide-core-modal-icon-button>`);
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
it('throws when it does not have a default slot', async () => {
    await expectUnhandledRejection(() => {
        return fixture(html `<glide-core-modal-icon-button
        label="Label"
      ></glide-core-modal-icon-button>`);
    });
});
