var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTabGroup from './tab.group.js';
import './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import expectWindowError from './library/expect-window-error.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreTabGroup {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-tab-group')).to.equal(GlideCoreTabGroup);
    expect(window.customElements.get('glide-core-tab-panel')).to.equal(GlideCoreTabPanel);
});
it('selects the first tab when none is selected', async () => {
    const host = await fixture(html `
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
    </glide-core-tab-group>
  `);
    const tabs = host.querySelectorAll('glide-core-tab');
    expect(tabs[0]?.selected).to.be.true;
    expect(tabs[1]?.selected).to.be.false;
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
it('throws when its default slot is thw wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <div>Default Content</div>
      </glide-core-tab-group>
    `);
    });
});
it('throws when its "nav" slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `
      <glide-core-tab-group>
        <div slot="nav">Tab 1</div>
        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      </glide-core-tab-group>
    `);
    });
});
