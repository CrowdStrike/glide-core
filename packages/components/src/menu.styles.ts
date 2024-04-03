import { css } from 'lit';

export default [
  css`
    :host {
      /* Contains elements with "padding", "margin", and "width". Inline by default. */
      display: inline-block;
    }

    .component {
      display: inline-block;
    }

    .target-container {
      position: relative;
    }

    .options {
      background-color: var(--cs-surface-base-lighter);
      border-radius: var(--cs-spacing-xs);
      border: 1px solid var(--cs-border-base-lighter);
      box-shadow: var(--cs-shadow-lg);
      box-sizing: border-box;
      left: 0px;
      margin-bottom: 0px;
      margin-top: 0px;
      min-width: 9.375rem;
      padding: var(--cs-spacing-xxxs);
      position: absolute;
      top: 0px;
      visibility: hidden;

      &.options--visible {
        visibility: visible;
      }

      &.options--large {
        --gap: var(--cs-spacing-sm);
        --padding-inline: var(--cs-spacing-sm);
        --padding-block: var(--cs-spacing-xxs);

        font-family: var(--cs-body-sm-font-family);
        font-size: var(--cs-body-sm-font-size);
        font-style: var(--cs-body-sm-font-style);
        font-weight: var(--cs-body-sm-font-weight);
        line-height: var(--cs-body-sm-line-height);
      }

      &.options--small {
        --gap: var(--cs-spacing-xs);
        --padding-inline: var(--cs-spacing-xs);
        --padding-block: var(--cs-spacing-xxxs);
        --size: 0.75rem;

        font-family: var(--cs-body-xs-font-family);
        font-size: var(--cs-body-xs-font-size);
        font-style: var(--cs-body-xs-font-style);
        font-weight: var(--cs-body-xs-font-weight);
        line-height: var(--cs-body-xs-line-height);
      }
    }
  `,
];
