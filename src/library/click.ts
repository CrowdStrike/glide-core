import { assert } from '@open-wc/testing';
import { resetMouse, sendMouse } from '@web/test-runner-commands';

export default async (
  element: Element | null | undefined,
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'outside'
    | 'center' = 'center',
) => {
  assert(element);

  const { height, width, x, y } = element.getBoundingClientRect();

  await sendMouse({
    type: 'click',
    position:
      position === 'top'
        ? [Math.ceil(x + width / 2), Math.ceil(y)]
        : position === 'right'
          ? [Math.floor(x + width), Math.ceil(y + height / 2)]
          : position === 'bottom'
            ? [Math.ceil(x + width / 2), Math.floor(y + height)]
            : position === 'left'
              ? [Math.ceil(x), Math.ceil(y + height / 2)]
              : position === 'outside'
                ? [Math.floor(x - 1), Math.floor(y - 1)]
                : [Math.ceil(x + width / 2), Math.ceil(y + height / 2)],
  });

  await resetMouse();
};
