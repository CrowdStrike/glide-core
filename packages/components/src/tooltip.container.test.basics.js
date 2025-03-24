var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreTooltipContainer from './tooltip.container.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreTooltipContainer {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-private-tooltip-container')).to.equal(GlideCoreTooltipContainer);
});
it('can have a single-key shortcut', async () => {
    const host = await fixture(html `<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['Enter']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`);
    const shortcut = host.shadowRoot?.querySelector('[data-test="shortcut"]');
    expect(shortcut?.textContent?.trim()).to.equal('Enter');
});
it('can have a multi-key shortcut', async () => {
    const host = await fixture(html `<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['CMD', 'K']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`);
    const shortcut = host.shadowRoot?.querySelector('[data-test="shortcut"]');
    expect(shortcut?.textContent?.replaceAll(/\s/g, '')).to.equal('CMD+K');
});
it('has no `role` when disabled', async () => {
    const host = await fixture(html `<glide-core-private-tooltip-container label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`);
    expect(host.role).to.equal('none');
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
