import { css } from 'lit';

export default [
  css`
    :host {
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .component {
      display: contents;
      font-family: var(--cs-body-sm-font-family);
      font-style: var(--cs-body-sm-font-style);
      font-weight: var(--cs-body-sm-font-weight);
      grid-template-columns: repeat(auto-fill, 2.5rem);
    }

    .expand-icon-container {
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
      border-radius: 0.625rem;
      color: var(--cs-text-body-1);
      display: flex;
      padding-block: var(--cs-spacing-xxs);
      padding-inline: var(--cs-spacing-xs);

      &:hover {
        background-color: var(--cs-surface-hover);
      }

      &.selected {
        background-color: var(--cs-surface-selected);
        color: var(--cs-text-selected);

        &:hover {
          background-color: var(--cs-color-dark-blue);
        }
      }

      &:focus-visible {
        outline: var(--cs-border-primary);
        outline-offset: -1px;
        outline-style: auto;
        outline-width: 2px;
      }
    }

    ::slotted([slot='prefix']) {
      margin-inline-end: var(--cs-spacing-xs);
    }

    ::slotted([slot='menu']) {
      visibility: hidden;
    }

    ::slotted([slot='suffix']) {
      padding-inline: var(--cs-spacing-xxs);
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
      flex-grow: 1;
    }

    .child-items {
      block-size: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .component-expanded {
      .child-items {
        block-size: auto;
      }
    }
  `,
];
