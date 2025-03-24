var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreButtonGroupButton {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-button-group-button')).to.equal(GlideCoreButtonGroupButton);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`);
    await expect(host).to.be.accessible();
});
it('sets `aria-checked` when selected', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
      selected
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.ariaChecked).to.equal('true');
});
it('sets `aria-checked` when not selected', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.ariaChecked).to.equal('false');
});
it('sets `aria-disabled` when disabled', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
      disabled
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.ariaDisabled).to.equal('true');
});
it('sets `aria-disabled` when not disabled', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.ariaDisabled).to.equal('false');
});
it('is tabbable when selected', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
      selected
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.tabIndex).to.equal(0);
});
it('is not tabbable when not selected', async () => {
    const host = await fixture(html `<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`);
    const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
    expect(radio?.tabIndex).to.equal(-1);
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-button-group-button></glide-core-button-group-button>`);
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
it('throws when `icon-only` and no "icon" slot', async () => {
    await expectUnhandledRejection(() => {
        return fixture(html `<glide-core-button-group-button
        label="Label"
        privateVariant="icon-only"
      ></glide-core-button-group-button>`);
    });
});
