import { css } from 'lit';

export default [
  css`
    .default-slot {
      &::slotted([role='menuitem']) {
        align-items: center;
        all: unset;
        background-color: transparent;
        border: none;
        border-radius: var(--glide-core-spacing-base-sm);
        box-sizing: border-box;
        display: flex;
        font-family: var(--glide-core-typography-family-primary);
        font-size: var(--glide-core-typography-size-body-default);
        font-weight: var(--glide-core-typography-weight-regular);
        gap: var(--private-gap);
        inline-size: 100%;
        padding-block: var(--glide-core-spacing-base-xxs);
        padding-inline: var(--glide-core-spacing-base-sm);
        transition: background-color 100ms ease-in-out;
        user-select: none;
      }

      &::slotted([role='menuitem']:is([disabled], [aria-disabled='true'])) {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &::slotted(
          [role='menuitem']:not(:is([disabled], [aria-disabled='true']))
        ) {
        color: var(--glide-core-color-static-text-default);
        cursor: pointer;
      }
    }
  `,
];
