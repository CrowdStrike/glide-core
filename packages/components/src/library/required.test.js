var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import required from './required.js';
import final from './final.js';
// In non-test scenarios, both `@required` and `@final` are
// used together. Using both decorators in tests allow us
// to verifying the component name is included in the
// message.
let GlideCoreWithRequiredProperty = class GlideCoreWithRequiredProperty extends LitElement {
};
__decorate([
    property(),
    required
], GlideCoreWithRequiredProperty.prototype, "label", void 0);
GlideCoreWithRequiredProperty = __decorate([
    customElement('glide-core-with-required-property'),
    final
], GlideCoreWithRequiredProperty);
it('throws when a required attribute is missing', async () => {
    const stub = sinon.stub(console, 'error');
    const spy = sinon.spy();
    window.addEventListener('unhandledrejection', spy, { once: true });
    fixture(html `<glide-core-with-required-property></glide-core-with-required-property>`);
    await waitUntil(() => spy.callCount);
    expect(spy.callCount).to.equal(1);
    expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;
    expect(spy.args.at(0)?.at(0).reason.message).to.equal('Expected GlideCoreWithRequiredProperty to have a `label` property.');
    stub.restore();
});
it('does not throw when a required attribute is not missing', async () => {
    const stub = sinon.stub(console, 'error');
    const spy = sinon.spy();
    window.addEventListener('unhandledrejection', spy, { once: true });
    await fixture(html `<glide-core-with-required-property
      label="Label"
    ></glide-core-with-required-property>`);
    expect(spy.callCount).to.equal(0);
    stub.restore();
});
