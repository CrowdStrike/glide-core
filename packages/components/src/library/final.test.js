var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import final from './final.js';
let GlideCoreFinal = class GlideCoreFinal extends LitElement {
};
GlideCoreFinal = __decorate([
    customElement('glide-core-final'),
    final
], GlideCoreFinal);
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreFinal {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('throws when a class is extended', async () => {
    const spy = sinon.spy();
    try {
        new GlideCoreSubclassed();
    }
    catch (error) {
        spy(error);
    }
    expect(spy.callCount).to.equal(1);
    expect(spy.args.at(0)?.at(0) instanceof TypeError).to.be.true;
    expect(spy.args.at(0)?.at(0).message).to.equal('GlideCoreFinal does not allow extension.');
});
it('does not throw when a class is not extended', () => {
    const spy = sinon.spy();
    try {
        new GlideCoreFinal();
    }
    catch (error) {
        spy(error);
    }
    expect(spy.callCount).to.equal(0);
});
