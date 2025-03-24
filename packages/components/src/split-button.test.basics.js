var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './split-button.primary-button.js';
import './split-button.primary-link.js';
import { expect, fixture, html } from '@open-wc/testing';
import './menu.button.js';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreSplitButton from './split-button.js';
import './split-button.secondary-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';
let GlideCoreSubclassed = class GlideCoreSubclassed extends GlideCoreSplitButton {
};
GlideCoreSubclassed = __decorate([
    customElement('glide-core-subclassed')
], GlideCoreSubclassed);
it('registers itself', async () => {
    expect(window.customElements.get('glide-core-split-button')).to.equal(GlideCoreSplitButton);
});
it('is accessible', async () => {
    const host = await fixture(html `
    <glide-core-split-button>
      <glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>

      <glide-core-split-button-secondary-button
        label="Label"
        slot="secondary-button"
      >
        <glide-core-menu-button label="Label"></glide-core-menu-button>
      </glide-core-split-button-secondary-button>
    </glide-core-split-button>
  `);
    await expect(host).to.be.accessible();
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
it('throws when its default slot is empty', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-split-button>
        <glide-core-split-button-secondary-button
          label="Label"
          slot="secondary-button"
        >
          <glide-core-menu-button label="Label"></glide-core-menu-button>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>`);
    });
});
it('throws when its default slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-split-button>
        <div></div>

        <glide-core-split-button-secondary-button
          label="Label"
          slot="secondary-button"
        >
          <glide-core-menu-button label="Label"></glide-core-menu-button>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>`);
    });
});
it('throws when its "secondary-button" slot is empty', async () => {
    await expectUnhandledRejection(() => {
        return fixture(html `<glide-core-split-button>
        <glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>
      </glide-core-split-button>`);
    });
});
it('throws when its "secondary-button" slot is the wrong type', async () => {
    await expectWindowError(() => {
        return fixture(html `<glide-core-split-button>
        <glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>

        <div slot="secondary-button"></div>
      </glide-core-split-button>`);
    });
});
