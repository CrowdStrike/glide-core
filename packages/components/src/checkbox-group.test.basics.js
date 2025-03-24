var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './checkbox.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import expectWindowError from './library/expect-window-error.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreCheckboxGroup {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-checkbox-group')).to.equal(GlideCoreCheckboxGroup);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-checkbox-group label="Label" tooltip="Tooltip">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
      <div slot="description">Description</div>
    </glide-core-checkbox-group>`);
    await expect(host).to.be.accessible();
});
it('enables checkboxes when `value` is set initially', async () => {
    const host = await fixture(html `<glide-core-checkbox-group label="Label" .value=${['value']}>
      <glide-core-checkbox
        label="Label"
        value="value"
        disabled
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`);
    const checkbox = host.querySelector('glide-core-checkbox');
    expect(checkbox?.disabled).to.be.false;
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-checkbox-group>
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-checkbox-group>`);
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
        return fixture(html `<glide-core-checkbox-group
        label="Label"
      ></glide-core-checkbox-group>`);
    });
});
it('throws when its default slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-checkbox-group label="Label">
        <button>Button</button>
      </glide-core-checkbox-group>`);
    });
});
