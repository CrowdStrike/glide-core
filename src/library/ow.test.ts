import { LitElement } from 'lit';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { html as litHtml } from 'lit';
import { owSlot, owSlotType } from './ow.js';

@customElement('glide-core-slot')
export default class GlideCoreSlot extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  override render() {
    return litHtml`<slot></slot>`;
  }
}

GlideCoreSlot.shadowRootOptions.mode = 'open';

it('throws when a slot lacks a node', async () => {
  const component = await fixture(html`<glide-core-slot></glide-core-slot>`);
  const slot = component.shadowRoot?.querySelector('slot');

  assert(slot !== null);

  expect(() => owSlot(slot)).to.throw();
});

it('throws when a slot lacks a specific node', async () => {
  const component = await fixture(
    html`<glide-core-slot>
      <span>Span</span>
    </glide-core-slot>`,
  );

  const slot = component.shadowRoot?.querySelector('slot');
  assert(slot !== null);

  expect(() => owSlotType(slot, [HTMLButtonElement])).to.throw();
});

it('does not throw when a slot has a node', async () => {
  const component = await fixture(
    html`<glide-core-slot>
      <span>Span</span>
    </glide-core-slot>`,
  );

  const slot = component.shadowRoot?.querySelector('slot');
  assert(slot !== null);

  expect(() => owSlot(slot)).to.not.throw();
});

it('does not throw when a slot has a specific node', async () => {
  const component = await fixture(
    html`<glide-core-slot> Text </glide-core-slot>`,
  );

  const slot = component.shadowRoot?.querySelector('slot');
  assert(slot !== null);

  expect(() => owSlotType(slot, [Text])).to.not.throw();
});

it('does not throw when a slot has no nodes', async () => {
  const component = await fixture(html`<glide-core-slot></glide-core-slot>`);

  const slot = component.shadowRoot?.querySelector('slot');
  assert(slot !== null);

  expect(() => owSlotType(slot, [HTMLButtonElement])).to.not.throw();
});
