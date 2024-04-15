import ow from 'ow';

/**
 * @description Asserts that a slot has at least one slotted node. Optionally asserts
 * that the slotted node is a certain type.
 *
 * @param slot - The slot to assert against.
 * @param slotted - An optional array of constructors. Slotted nodes must extend one of them.
 */
export function owSlot(
  slot?: HTMLSlotElement,
  slotted: (typeof Element | typeof Text)[] = [],
) {
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

  if (slotted.length > 0) {
    const nodes = slot.assignedNodes().filter((node) => {
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

export { default } from 'ow';
