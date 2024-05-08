/* eslint-disable @crowdstrike/glide-core-eslint-plugin/prefer-closed-shadow-root */
import { LitElement } from 'lit';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { owSlot, owSlotType } from './ow.js';

@customElement('cs-slot')
export default class CsSlot extends LitElement {
  override render() {
    return html`<slot></slot>`;
  }
}

it('throws when a slot lacks a node', async () => {
  const component = await fixture<CsSlot>(html`<cs-slot></cs-slot>`);
  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlot(slot)).to.throw();
});

it('throws when a slot lacks a specific node', async () => {
  const component = await fixture<CsSlot>(
    html`<cs-slot>
      <span>Span</span>
    </cs-slot>`,
  );

  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlotType(slot, [HTMLButtonElement])).to.throw();
});

it('does not throw when a slot has a node', async () => {
  const component = await fixture<CsSlot>(
    html`<cs-slot>
      <span>Span</span>
    </cs-slot>`,
  );

  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlot(slot)).to.not.throw();
});

it('does not throw when a slot has a specific node', async () => {
  const component = await fixture<CsSlot>(html`<cs-slot> Text </cs-slot>`);
  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlotType(slot, [Text])).to.not.throw();
});

it('does not throw when a slot has no nodes', async () => {
  const component = await fixture<CsSlot>(html`<cs-slot></cs-slot>`);
  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlotType(slot, [HTMLButtonElement])).to.not.throw();
});
