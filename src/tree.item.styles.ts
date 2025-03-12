import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.label-container:not(.selected):focus-visible')}
  `,
  css`
    :host {
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .component {
      display: contents;
      font-family: var(--glide-core-typography-family-primary);
      font-weight: var(--glide-core-typography-weight-regular);
      grid-template-columns: repeat(auto-fill, 2.5rem);
      line-height: 1.25rem;

      --private-color: var(--glide-core-color-interactive-text-default);

      &.selected {
        --private-color: var(
          --glide-core-color-interactive-text-default--active
        );

        ::slotted([slot='prefix']),
        ::slotted([slot='menu']),
        ::slotted([slot='suffix']) {
          --private-hovered-icon-button-color: var(
            --glide-core-color-interactive-icon-active--hover
          );
        }
      }
    }

    .expand-icon-container {
      flex-shrink: 0;
      min-inline-size: 1.5625rem;

      &.expanded {
        svg {
          rotate: 0deg;
        }
      }

      svg {
        align-items: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        rotate: -90deg;

        @media (prefers-reduced-motion: no-preference) {
          transition: 250ms rotate ease;
        }
      }
    }

    .prefix-slot {
      align-items: center;
      display: flex;
    }

    .label-and-children {
      display: flex;
      flex-direction: column;
    }

    .label-container {
      align-items: center;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      color: var(--private-color);
      display: flex;
      font-size: var(--glide-core-typography-size-component-inputvalue);
      padding-block: var(--glide-core-spacing-base-xxs);
      padding-inline: var(--glide-core-spacing-base-xs);

      @media (prefers-reduced-motion: no-preference) {
        transition: background-color 150ms ease-in-out;
      }

      &.selected {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
      }

      &:hover {
        background-color: var(
          --glide-core-color-interactive-surface-container--hover
        );

        &.selected {
          background-color: var(
            --glide-core-color-interactive-surface-container-active--hover
          );
        }
      }

      &:focus-visible {
        &:not(&.selected) {
          /* The outline is inside the component since children have overflow hidden */
          outline-offset: -2px;
        }

        &.selected {
          outline: 1px solid
            var(--glide-core-color-interactive-icon-default--active);
          outline-offset: -3px;
        }
      }
    }

    ::slotted([slot='menu']) {
      visibility: hidden;
    }

    ::slotted([slot='prefix']),
    ::slotted([slot='menu']),
    ::slotted([slot='suffix']) {
      --private-icon-button-color: var(--private-color);
    }

    .label-container:hover,
    .label-container:focus,
    .label-container:focus-within,
    .label-container:focus-visible {
      ::slotted([slot='menu']) {
        visibility: visible;
      }
    }

    .label {
      margin-inline-end: auto;
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.prefix-icon {
        padding-inline-start: var(--glide-core-spacing-base-xs);
      }
    }

    .default-slot-container {
      block-size: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      visibility: hidden;

      &.expanded {
        block-size: auto;
        visibility: visible;
      }
    }

    .icon-container {
      display: flex;
      gap: var(--glide-core-spacing-base-xxs);
      padding-inline: var(--glide-core-spacing-base-xxs);
    }
  `,
];
