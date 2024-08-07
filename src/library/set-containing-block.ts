import GlideCoreMenu from '../menu.js';
import GlideCoreTooltip from '../tooltip.js';
import GlideCoreTree from '../tree.js';

interface Arguments {
  elements: Element[];
  containingBlock: Element;
}

/**
 * Sets the containing block for all child elements that might contain
 * floating-ui components (i.e. tooltips, popovers, or menus),
 * for cases where the containing block element is inside a closed shadow DOM,
 * and therefore wouldn't be able to be detected by floating-ui's getOffsetParent calculations.
 * Necessary when the containing block has something like a backdrop-filter
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
 * https://github.com/floating-ui/floating-ui/issues/2955
 */
export function setContainingBlock({ elements, containingBlock }: Arguments) {
  const floatingComponents: (
    | GlideCoreTooltip
    | GlideCoreMenu
    | GlideCoreTree
  )[] = elements.filter((element) => {
    return (
      element instanceof GlideCoreTooltip ||
      element instanceof GlideCoreMenu ||
      element instanceof GlideCoreTree
    );
  });

  for (const floatingComponent of floatingComponents) {
    floatingComponent.setContainingBlock(containingBlock);
  }
}
