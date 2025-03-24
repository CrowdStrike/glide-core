var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './button.js';
import './modal.icon-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreModal from './modal.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreModal {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-modal')).to.equal(GlideCoreModal);
});
it('is accessible', async () => {
    const host = await fixture(html `<glide-core-modal label="Label">Content</glide-core-modal>`);
    await expect(host).to.be.accessible();
});
it('can be opened', async () => {
    const host = await fixture(html `<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`);
    expect(host.checkVisibility()).to.be.true;
});
it('can have a back button', async () => {
    const host = await fixture(html `<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`);
    const button = host.shadowRoot?.querySelector('[data-test="back-button"]');
    expect(button?.checkVisibility()).to.be.true;
});
it('can have a severity', async () => {
    const host = await fixture(html `<glide-core-modal label="Label" severity="informational" open>
      Content
    </glide-core-modal>`);
    expect(host.shadowRoot
        ?.querySelector('[data-test="severity"]')
        ?.checkVisibility()).to.be.true;
});
it('has a severity icon instead of a back button when both are provided', async () => {
    const host = await fixture(html `<glide-core-modal
      label="Label"
      severity="informational"
      back-button
      open
    >
      Content
    </glide-core-modal>`);
    expect(host.shadowRoot
        ?.querySelector('[data-test="severity"]')
        ?.checkVisibility()).to.be.true;
    expect(host.shadowRoot
        ?.querySelector('[data-test="back-button"]')
        ?.checkVisibility()).to.not.be.ok;
});
it('throws when `label` is empty', async () => {
    const spy = sinon.spy();
    try {
        await fixture(html `<glide-core-modal>Content</glide-core-modal>`);
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
        return fixture(html `<glide-core-modal label="Label"></glide-core-modal>`);
    });
});
it('throws an error when the "primary" footer slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-modal label="Label">
        Content
        <span slot="primary">Primary</span>
      </glide-core-modal>`);
    });
});
it('throws an error when the "secondary" footer slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-modal label="Label">
        Content
        <span slot="secondary">Secondary</span>
      </glide-core-modal>`);
    });
});
it('throws an error when the "header-actions" slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-modal label="Label">
        Content
        <span slot="header-actions">Header Action</span>
      </glide-core-modal>`);
    });
});
it('throws an error when the "tertiary" footer slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-modal label="Label">
        Content
        <span slot="tertiary">Tertiary</span>
      </glide-core-modal>`);
    });
});
it('has `severity="critical" coverage', async () => {
    await fixture(html `<glide-core-modal label="Label" severity="critical">
      Content
    </glide-core-modal>`);
});
it('has `severity="medium" coverage', async () => {
    await fixture(html `<glide-core-modal label="Label" severity="medium">
      Content
    </glide-core-modal>`);
});
