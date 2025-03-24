var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { styleMap } from 'lit/directives/style-map.js';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreCheckbox from './checkbox.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreCheckbox {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-checkbox')).to.equal(GlideCoreCheckbox);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-checkbox label="Label" summary="Summary" tooltip="Tooltip">
      <div slot="description">Description</div>
    </glide-core-checkbox>`);
    await expect(host).to.be.accessible();
});
it('has a tooltip when "minimal" with a long label', async () => {
    const host = await fixture(html `<glide-core-checkbox
      style=${styleMap({
        display: 'block',
        maxWidth: '6.25rem',
    })}
      label=${'x'.repeat(100)}
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`);
    // Wait for the tooltip.
    await aTimeout(0);
    const tooltip = host.shadowRoot?.querySelector('[data-test="label-tooltip"]');
    expect(tooltip?.disabled).to.be.false;
    expect(tooltip?.open).to.be.true;
    expect(tooltip?.textContent?.trim()).to.equal('x'.repeat(100));
});
it('has no tooltip when "minimal" with a short label', async () => {
    const host = await fixture(html `<glide-core-checkbox
      label="Label"
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`);
    // Wait for the tooltip.
    await aTimeout(0);
    const tooltip = host.shadowRoot?.querySelector('[data-test="label-tooltip"]');
    expect(tooltip?.disabled).to.be.true;
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-checkbox></glide-core-checkbox>`);
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
