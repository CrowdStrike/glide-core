import { assert } from '@open-wc/testing';
import { resetMouse, sendMouse } from '@web/test-runner-commands';

export function click(
  element: Element | null | undefined,
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'outside'
    | 'center' = 'center',
) {
  return mouse(element, position, 'click');
}

export function hover(
  element: Element | null | undefined,
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'outside'
    | 'center' = 'center',
) {
  return mouse(element, position, 'move');
}

async function mouse(
  element: Element | null | undefined,
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'outside'
    | 'center' = 'center',
  type: 'click' | 'move',
) {
  assert(element);

  const { height, width, x, y } = element.getBoundingClientRect();

  await sendMouse({
    type,
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

  // You'd think you'd be able to call `resetMouse()` anywhere. But, for whatever
  // reason, calling it outside `afterEach()` results in sporadic bouts of the
  // following error via Playwright:
  //
  // "mouse.move: Target page, context or browser has been closed".
  afterEach(async () => {
    await resetMouse();
  });
}
