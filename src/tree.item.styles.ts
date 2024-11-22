import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.label-container:focus-visible')}
  `,
  css`
    :host {
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .component {
      display: contents;
      font-family: var(--glide-core-body-sm-font-family);
      font-style: var(--glide-core-body-sm-font-style);
      font-weight: var(--glide-core-body-sm-font-weight);
      grid-template-columns: repeat(auto-fill, 2.5rem);
      line-height: 1.25rem;

      --color: var(--glide-core-text-body-1);

      &.selected {
        --color: var(--glide-core-text-selected);
      }
    }

    .expand-icon-container {
      flex-shrink: 0;
      min-inline-size: 1.5625rem;
    }

    .expand-icon {
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      rotate: 0deg;
      transition: 250ms rotate ease;

      &.expand-icon-expanded {
        rotate: 90deg;
      }
    }

    .label-and-children {
      display: flex;
      flex-direction: column;
    }

    .label-container {
      align-items: center;
      border-radius: 0.5rem;
      color: var(--color);
      display: flex;
      font-size: var(--glide-core-body-sm-font-size);
      padding-block: var(--glide-core-spacing-xxs);
      padding-inline: var(--glide-core-spacing-xs);
      transition: background-color 150ms ease-in-out;

      &:hover {
        background-color: var(--glide-core-surface-hover);
      }

      &.selected {
        background-color: var(--glide-core-surface-selected);

        &:hover {
          background-color: var(--glide-core-surface-selected-hover);
        }
      }

      &:focus-visible {
        /* The outline is inside the component since children have overflow hidden */
        outline-offset: -2px;

        .component.selected & {
          /*
            We need !important here as we must override the focusVisible mixin
            that also includes !important.
            This component is a bit of a unique case as we want to override the
            default outline styles when a tree item is also focus-visible, but
            also selected.
          */
          outline: 1px solid var(--glide-core-icon-selected) !important;
          outline-offset: -3px;
        }
      }

      .component.selected & {
        background-color: var(--glide-core-surface-selected);

        &:hover {
          background-color: var(--glide-core-color-dark-blue);
        }
      }

      &.prefix-icon .label {
        padding-inline-start: var(--glide-core-spacing-xs);
      }
    }

    ::slotted([slot='menu']) {
      visibility: hidden;
    }

    ::slotted([slot='prefix']),
    ::slotted([slot='menu']),
    ::slotted([slot='suffix']) {
      --icon-button-color: var(--color);
    }

    .component.selected ::slotted([slot='prefix']),
    .component.selected ::slotted([slot='menu']),
    .component.selected ::slotted([slot='suffix']) {
      --hovered-icon-button-color: var(--glide-core-icon-hover);
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
    }

    .child-items {
      block-size: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      visibility: hidden;
    }

    .expanded {
      .child-items {
        block-size: auto;
        visibility: visible;
      }
    }

    .icon-container {
      display: flex;
      gap: var(--glide-core-spacing-xxs);
      padding-inline: var(--glide-core-spacing-xxs);
    }
  `,
];
