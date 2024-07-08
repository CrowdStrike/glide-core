import { css } from 'lit';

export default [
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-flex;
    }

    .component {
      align-items: center;
      block-size: var(--size, 1.625rem);
      border-color: transparent;
      border-radius: 0.5rem;
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      inline-size: var(--size, 1.625rem);
      justify-content: center;
      padding-inline: 0;
      transition-duration: 150ms;
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: 2px solid var(--glide-core-surface-primary);
        outline-offset: 1px;
      }

      &:disabled {
        cursor: default;
        opacity: 1;
      }

      &.primary {
        background-color: var(--glide-core-surface-primary);
        border-color: transparent;
        color: var(--icon-color, var(--glide-core-icon-selected));

        &:disabled {
          background-color: var(--glide-core-surface-base-gray-light);
          border-color: transparent;
          color: var(--glide-core-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--glide-core-surface-selected);
          border-color: transparent;
          color: var(--glide-core-icon-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          box-shadow: var(--glide-core-glow-sm);
          color: var(--glide-core-icon-primary);
        }
      }

      &.secondary {
        background-color: var(--glide-core-surface-page);
        border-color: transparent;
        color: var(--icon-color, var(--glide-core-icon-default));

        &:disabled {
          background-color: transparent;
          color: var(--glide-core-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          background-color: var(--glide-core-surface-selected);
          border-color: transparent;
          color: var(--glide-core-icon-selected);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(--glide-core-surface-hover);
          border-color: transparent;
          color: var(--glide-core-icon-primary);
        }
      }

      &.tertiary {
        background-color: transparent;
        block-size: var(--size, 1rem);
        border-color: transparent;
        color: var(--icon-color, var(--glide-core-icon-default));
        inline-size: var(--size, 1rem);
        padding: 0;

        &:focus-visible {
          border-radius: 0.25rem;
          outline-offset: 0;
        }

        &:disabled {
          color: var(--glide-core-icon-tertiary-disabled);
        }

        &:not(:disabled):active {
          color: var(--glide-core-icon-active);
        }

        &:not(:active):hover:not(:disabled) {
          color: var(
            --hovered-icon-color,
            var(--glide-core-icon-primary-hover)
          );
        }
      }
    }
  `,
];
