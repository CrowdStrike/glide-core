import { css } from 'lit';

export default [
  css`
    .component {
      border-radius: var(--glide-core-spacing-base-sm);
      box-sizing: border-box;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      padding-block: var(--glide-core-spacing-base-xxs);
      padding-inline: var(--glide-core-spacing-base-sm);
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);

        /* TODO: say why. because it may be inside an enabled option */
        cursor: auto;
      }

      &:not(.disabled) {
        color: var(--glide-core-color-static-text-default);
        cursor: pointer;
      }

      &.href {
        display: block;
        text-decoration: none;
      }
    }

    .content-slot {
      &.fallback {
        align-items: center;
        display: flex;
        inline-size: 100%;
      }
    }

    .icon-and-label {
      display: flex;
      gap: var(--glide-core-spacing-base-sm);
    }

    .checked-icon-container {
      --private-size: 1rem;

      display: contents;

      > svg {
        /* TODO: figure out why flex-shrink */
        flex-shrink: 0;
        margin-inline-start: auto;
        padding-inline-start: var(--glide-core-spacing-base-xs);
      }
    }

    .submenu-slot {
      display: block;
      margin-inline-start: auto;

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
        cursor: auto;
      }
    }
  `,
];
