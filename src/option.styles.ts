import { css } from 'lit';

export default [
  css`
    .tooltip {
      display: block;
    }

    .container {
      border-radius: var(--glide-core-rounding-base-radius-xs);
      box-sizing: border-box;
      color: var(--glide-core-color-static-text-default);
      cursor: pointer;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      inline-size: 100%;
      max-inline-size: 21.875rem;
      min-block-size: 1.75rem;
      padding-block: var(--glide-core-spacing-base-xxs);
      padding-inline: var(--glide-core-spacing-base-sm);
      transition: background-color var(--glide-core-duration-fast-02)
        ease-in-out;
      user-select: none;

      &.active {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);

        /*
          If this is an Option in a sub-Menu, "cursor: pointer" (above) will be inherited
          from the parent Option (the one the contains the sub-Menu). So we make sure we
          override it.
        */
        cursor: default;
      }

      &.href {
        display: block;
        text-decoration: none;

        &:not(.disabled) {
          color: inherit;
        }
      }
    }

    .content-slot {
      &.fallback {
        align-items: center;
        display: grid;
        grid-column-gap: var(--glide-core-spacing-base-xs);

        &.icon {
          grid-template-columns: auto 1fr;

          &.submenu {
            display: grid;
            grid-template-columns: auto 1fr auto;
          }
        }

        &.submenu {
          grid-template-columns: 1fr auto;
        }

        &:not(.multiple) {
          &.selected {
            grid-template-columns: 1fr auto;

            &.icon {
              grid-template-columns: auto 1fr auto;

              &.submenu {
                grid-template-columns: auto 1fr auto auto;
              }
            }

            &.submenu {
              grid-template-columns: 1fr auto auto;
            }
          }
        }
      }
    }

    .checkbox {
      align-items: center;
      column-gap: var(--glide-core-spacing-base-xs);
      display: flex;
    }

    .label {
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.bold {
        font-weight: var(--glide-core-typography-weight-bold);
      }
    }

    .description {
      grid-column: 1 / 2;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.icon {
        grid-column: 2 / 3;
      }
    }

    .checked-icon-container {
      --private-size: 1rem;

      display: contents;
    }

    .submenu-slot {
      &::slotted(*) {
        opacity: 0;
      }

      &.active {
        &::slotted(*) {
          opacity: 1;
        }
      }

      &:hover {
        &:not(.disabled) {
          &::slotted(*) {
            color: var(--glide-core-color-interactive-text-link--hover);
            opacity: 1;
          }
        }
      }

      &.open {
        &::slotted(*) {
          color: var(--glide-core-color-interactive-text-link--hover);
          opacity: 1;
        }
      }
    }
  `,
];
