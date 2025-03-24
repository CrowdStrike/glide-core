var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { expect, fixture, html } from '@open-wc/testing';
import en from '../translations/en.js';
import { LocalizeController } from './localize.js';
let GlideCoreMockComponent = class GlideCoreMockComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.localize = new LocalizeController(this);
    }
};
GlideCoreMockComponent = __decorate([
    customElement('mock-host')
], GlideCoreMockComponent);
it('can call any term from en translation if locale is Japanese', async () => {
    const host = await fixture(html `<mock-host></mock-host>`);
    host.lang = 'ja';
    expect(host.localize.lang()).to.equal('ja');
    const keys = Object.keys(en);
    for (const key of keys) {
        expect(host.localize.term(key)).to.be.ok;
    }
});
it('can call any term from en translation if locale is French', async () => {
    const host = await fixture(html `<mock-host></mock-host>`);
    host.lang = 'fr';
    expect(host.localize.lang()).to.equal('fr');
    const keys = Object.keys(en);
    for (const key of keys) {
        expect(host.localize.term(key)).to.be.ok;
    }
});
