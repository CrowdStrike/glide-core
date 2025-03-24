var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreLabel from './label.js';
import './tooltip.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreLabel {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-private-label')).to.equal(GlideCoreLabel);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
      <div slot="description">Description</div>
    </glide-core-private-label>`);
    await expect(host).to.be.accessible();
});
it('can be required', async () => {
    const host = await fixture(html `<glide-core-private-label required>
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`);
    const label = host.shadowRoot?.querySelector('[data-test="label"]');
    expect(label?.textContent?.includes('*')).to.be.true;
});
it('places the tooltip on the bottom when horizontal', async () => {
    const host = await fixture(html `<glide-core-private-label tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`);
    expect(host.shadowRoot?.querySelector('glide-core-tooltip')?.placement).to.equal('bottom');
});
it('places the tooltip on the right when vertical', async () => {
    const host = await fixture(html `<glide-core-private-label orientation="vertical" tooltip="Tooltip">
      <label for="input">Label</label>
      <input id="input" slot="control" />
    </glide-core-private-label>`);
    expect(host.shadowRoot?.querySelector('glide-core-tooltip')?.placement).to.equal('right');
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
        return fixture(html `<glide-core-private-label
        ><input slot="control"
      /></glide-core-private-label>`);
    });
});
it('throws when it does not have a "control" slot', async () => {
    await expectUnhandledRejection(() => {
        return fixture(html `<glide-core-private-label>
        <label>Label</label>
      </glide-core-private-label>`);
    });
});
