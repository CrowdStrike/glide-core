import { css } from 'lit';
import opacityAndScaleAnimation from '@/src/styles/opacity-and-scale-animation.js';

export default [
  css`
    ${opacityAndScaleAnimation('.default-slot:popover-open')}
  `,
  css`
    .target-slot {
      &::slotted(:is([disabled], [aria-disabled='true'])) {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: default;
      }
    }

    .default-slot {
      background-color: var(
        --glide-core-private-color-dialog-and-modal-surface-container
      );
      border: 1px solid var(--glide-core-color-static-stroke-secondary);
      border-radius: var(--glide-core-rounding-base-radius-sm);
      box-shadow: var(--glide-core-effect-floating);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);

      /*
        For submenus, which will inherit "cursor: pointer" from their Option(s).
        "cursor: default" tells the user that clicking the padding around the
        default slot won't select an Option.
      */
      cursor: default;
      inline-size: max-content;
      inset: unset;
      margin-block: 0;
      min-inline-size: 9.375rem;
      padding-block-end: 0;
      padding-block-start: var(--glide-core-spacing-base-xxxs);
      padding-inline: var(--glide-core-spacing-base-xxxs);
      position: absolute;

      /*
        This little hack replaces "padding-block-end", which the last option overlaps
        when the Option(s) overflow and scroll.
      */
      &::slotted(glide-core-options)::after {
        block-size: var(--glide-core-spacing-base-xxxs);
        content: '';
        display: block;
      }
    }
  `,
];
