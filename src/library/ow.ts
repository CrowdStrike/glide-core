import ow, { type Ow } from 'ow';

const isDevelopment =
  window.location.host.startsWith('localhost') ||
  window.location.host.startsWith('127.0.0.1');

/**
 * @description Asserts that a slot has at least one slotted node.
 *
 * @param slot - The slot to assert against.
 */
export function owSlot(
  slot?: HTMLSlotElement,
): asserts slot is HTMLSlotElement {
  if (!isDevelopment) {
    return;
  }

  ow(
    slot,
    ow.object.is((object) => object instanceof HTMLSlotElement),
  );

  ow(
    slot.assignedNodes().length,
    ow.number
      .is((x) => x > 0)
      .message(
        slot.name
          ? `Expected a "${slot.name}" slot.`
          : 'Expected a default slot.',
      ),
  );
}

/**
 * @description Asserts that slotted nodes are a certain type.
 *
 * @param slot - The slot to assert against.
 * @param slotted - An array of constructors. Slotted nodes must extend one of them.
 */
export function owSlotType(
  slot?: HTMLSlotElement,
  slotted: (typeof Element | typeof Text)[] = [],
): asserts slot is HTMLSlotElement {
  if (!isDevelopment) {
    return;
  }

  ow(
    slot,
    ow.object.is((object) => object instanceof HTMLSlotElement),
  );

  if (slot.assignedNodes().length === 0) {
    return;
  }

  if (slotted.length > 0) {
    const nodes = slot.assignedNodes({ flatten: true }).filter((node) => {
      // If `assignedNodes()` includes a `Text` node but `Text` isn't included in
      // `slotted`, then it's filtered out so `isAllowed` doesn't result in a false
      // positive. This doesn't mean that a slot can't contain `Text` node. It just
      // means the presence of a `Text` node isn't enough to satisfy the assertion below.
      return node instanceof Text && slotted.includes(Text)
        ? true
        : node instanceof Text
          ? false
          : true;
    });

    // If `nodes` is empty after filtering, then the slot only contains `Text`
    // nodes and `slotted` does not include `Text`. This is usually a case where
    // the slot only contains whitespace.
    ow(
      nodes.length,
      ow.number
        .is((x) => x > 0)
        .message(
          `Expected a slotted node that extends ${slotted
            .map(({ name }) => name)
            .join(' or ')}.`,
        ),
    );

    for (const node of nodes) {
      const message = `Expected slotted node to extend ${slotted
        .map(({ name }) => name)
        .join(' or ')}. Extends ${node.constructor.name} instead.`;

      const isAllowed = slotted.some(
        (Constructor) => node instanceof Constructor,
      );

      ow(isAllowed, ow.boolean.true.message(message));
    }
  }
}

// Ow's `ow/dev-only` uses the same shim. However, it imports Ow conditionally
// and asynchronously, which makes it hard to typecheck. Ow also assumes the
// existence of `NODE_ENV` and the existence of a bundler that inlines it,
// which we can't assume.
//
// https://github.com/sindresorhus/ow/blob/b48757a77047c26290332321290b714b7dc8c842/dev-only.js
// eslint-disable-next-line @typescript-eslint/no-empty-function
const shim = new Proxy(() => {}, {
  get: () => shim,
  apply: () => shim,
}) as unknown as Ow;

const owOrShim: Ow = isDevelopment ? ow : shim;

export default owOrShim;
