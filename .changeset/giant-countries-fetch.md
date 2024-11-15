---
'@crowdstrike/glide-core': patch
---

`@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

## Light

### Added

```diff
+ --glide-core-background-fill: #15141400;
+ --glide-core-effects-shadow-large-background-blur: 12.5rem;
+ --glide-core-effects-shadow-large-blur: 0.875rem;
+ --glide-core-effects-shadow-large-fill: #00000040;
+ --glide-core-effects-shadow-large-spread: 0rem;
+ --glide-core-effects-shadow-large-x: 0rem;
+ --glide-core-effects-shadow-large-y: 0.25rem;
+ --glide-core-effects-shadow-xlarge-background-blur: 6.25rem;
+ --glide-core-effects-shadow-xlarge-blur: 3.75rem;
+ --glide-core-effects-shadow-xlarge-fill: #adadad;
+ --glide-core-effects-shadow-xlarge-spread: 0rem;
+ --glide-core-effects-shadow-xlarge-x: 0rem;
+ --glide-core-effects-shadow-xlarge-y: 0.25rem;
```

## Dark

### Added

```diff
+ --glide-core-background-fill: #151414f7;
+ --glide-core-effects-shadow-large-background-blur: 12.5rem;
+ --glide-core-effects-shadow-large-blur: 3.125rem;
+ --glide-core-effects-shadow-large-fill: #00000080;
+ --glide-core-effects-shadow-large-spread: 0rem;
+ --glide-core-effects-shadow-large-x: 0rem;
+ --glide-core-effects-shadow-large-y: 0.625rem;
+ --glide-core-effects-shadow-xlarge-background-blur: 0rem;
+ --glide-core-effects-shadow-xlarge-blur: 4rem;
+ --glide-core-effects-shadow-xlarge-fill: #000000f7;
+ --glide-core-effects-shadow-xlarge-spread: 0rem;
+ --glide-core-effects-shadow-xlarge-x: 0rem;
+ --glide-core-effects-shadow-xlarge-y: 0.25rem;
+ --glide-core-surface-base-gray-lightest: #ffffff0d;
```

### Changed

```diff
- --glide-core-border-action: #0073e6;
+ --glide-core-border-action: #3989da;

- --glide-core-border-base: #6d6d6d;
+ --glide-core-border-base: #585858;

- --glide-core-border-base-dark: #c9c9c9;
+ --glide-core-border-base-dark: #8a8a8a;

- --glide-core-border-base-darker: #e3e3e3;
+ --glide-core-border-base-darker: #424242;

- --glide-core-border-base-light: #212121;
+ --glide-core-border-base-light: #424242;

- --glide-core-border-base-lighter: #212121;
+ --glide-core-border-base-lighter: #424242;

- --glide-core-border-base-lightest: #424242;
+ --glide-core-border-base-lightest: #c9c9c9;

- --glide-core-border-base-transparent: #0000001a;
+ --glide-core-border-base-transparent: #ffffff1a;

- --glide-core-border-focus: #0073e6;
+ --glide-core-border-focus: #3989da;

- --glide-core-border-primary: #ffffff;
+ --glide-core-border-primary: #424242;

- --glide-core-border-primary-hover: #0461cf;
+ --glide-core-border-primary-hover: #3989da;

- --glide-core-icon-active: #0073e6;
+ --glide-core-icon-active: #3989da;

- --glide-core-icon-default: #ffffff;
+ --glide-core-icon-default: #f0f0f0;

- --glide-core-icon-default2: #212121;
+ --glide-core-icon-default2: #8a8a8a;

- --glide-core-icon-display: #ffffff;
+ --glide-core-icon-display: #f0f0f0;

- --glide-core-icon-display-light: #d7e7ff;
+ --glide-core-icon-display-light: #8a8a8a;

- --glide-core-icon-primary: #ffffff;
+ --glide-core-icon-primary: #73b2f3;

- --glide-core-icon-primary-hover: #d7e7ff;
+ --glide-core-icon-primary-hover: #4d99e7;

- --glide-core-icon-secondary-disabled: #d7e7ff;
+ --glide-core-icon-secondary-disabled: #c9c9c9;

- --glide-core-icon-selected: #ffffff;
+ --glide-core-icon-selected: #f0f0f0;

- --glide-core-icon-selected-disabled: #eef5ff;
+ --glide-core-icon-selected-disabled: #c9c9c9;

- --glide-core-icon-selected2: #424242;
+ --glide-core-icon-selected2: #f0f0f0;

- --glide-core-icon-tertiary-disabled: #6d6d6d;
+ --glide-core-icon-tertiary-disabled: #ffffff8c;

- --glide-core-status-error: #ff3b30;
+ --glide-core-status-error: #db4743;

- --glide-core-status-expired: #ff3b30;
+ --glide-core-status-expired: #db4743;

- --glide-core-status-failed: #ff3b30;
+ --glide-core-status-failed: #db4743;

- --glide-core-status-in-progress: #ffcc00;
+ --glide-core-status-in-progress: #fad232;

- --glide-core-status-queued: #5ac8fa;
+ --glide-core-status-queued: #63a8c7;

- --glide-core-status-scheduled: #af52de;
+ --glide-core-status-scheduled: #ae73cd;

- --glide-core-status-success: #34c759;
+ --glide-core-status-success: #51bc6f;

- --glide-core-status-unknown: #6d6d6d;
+ --glide-core-status-unknown: #686868;

- --glide-core-status-warning-critical: #ff3b30;
+ --glide-core-status-warning-critical: #db4743;

- --glide-core-status-warning-high: #ff9500;
+ --glide-core-status-warning-high: #e3901d;

- --glide-core-status-warning-informational: #0073e6;
+ --glide-core-status-warning-informational: #3989da;

- --glide-core-status-warning-low: #607d8b;
+ --glide-core-status-warning-low: #607c89;

- --glide-core-status-warning-medium: #ffcc00;
+ --glide-core-status-warning-medium: #fad232;

- --glide-core-surface-active: #ffffff;
+ --glide-core-surface-active: #ffffffe5;

- --glide-core-surface-base: #424242;
+ --glide-core-surface-base: #ffffff26;

- --glide-core-surface-base-dark: #f0f0f0;
+ --glide-core-surface-base-dark: #625c5c;

- --glide-core-surface-base-gray: #00000066;
+ --glide-core-surface-base-gray: #ffffff1a;

- --glide-core-surface-base-gray-dark: #ffffff8c;
+ --glide-core-surface-base-gray-dark: #ffffff1a;

- --glide-core-surface-base-gray-light: #00000066;
+ --glide-core-surface-base-gray-light: #ffffff12;

- --glide-core-surface-base-gray-lighter: #ffffff1a;
+ --glide-core-surface-base-gray-lighter: #ffffff0d;

- --glide-core-surface-base-light: #0000008c;
+ --glide-core-surface-base-light: #ffffff08;

- --glide-core-surface-base-lighter: #000000bf;
+ --glide-core-surface-base-lighter: #ffffff12;

- --glide-core-surface-base-lightest: #000000cc;
+ --glide-core-surface-base-lightest: #ffffff0d;

- --glide-core-surface-base-xlightest: #000000e5;
+ --glide-core-surface-base-xlightest: #333030;

- --glide-core-surface-disabled: #424242;
+ --glide-core-surface-disabled: #6d6d6d;

- --glide-core-surface-focus: #0073e6;
+ --glide-core-surface-focus: #3989da;

- --glide-core-surface-hover: #0461cf;
+ --glide-core-surface-hover: #567a9e75;

- --glide-core-surface-modal: #151515;
+ --glide-core-surface-modal: #464242;

- --glide-core-surface-primary: #0073e6;
+ --glide-core-surface-primary: #3989da;

- --glide-core-surface-primary-disabled: #6d6d6d;
+ --glide-core-surface-primary-disabled: #3989da99;

- --glide-core-surface-selected: #0073e6;
+ --glide-core-surface-selected: #3989da;

- --glide-core-surface-selected-disabled: #8a8a8a;
+ --glide-core-surface-selected-disabled: #c9c9c9;

- --glide-core-surface-selected-hover: #054fb9;
+ --glide-core-surface-selected-hover: #256db7;

- --glide-core-surface-unselected-disabled: #e3e3e3;
+ --glide-core-surface-unselected-disabled: #6d6d6d;

- --glide-core-text-body-1: #ffffff;
+ --glide-core-text-body-1: #f0f0f0;

- --glide-core-text-body-light: #ffffff;
+ --glide-core-text-body-light: #f0f0f0;

- --glide-core-text-body-lighter: #8a8a8a;
+ --glide-core-text-body-lighter: #f0f0f0;

- --glide-core-text-disabled: #f0f0f0;
+ --glide-core-text-disabled: #c9c9c9;

- --glide-core-text-header-1: #ffffff;
+ --glide-core-text-header-1: #f0f0f0;

- --glide-core-text-header-2: #d7e7ff;
+ --glide-core-text-header-2: #f0f0f0;

- --glide-core-text-link: #8babf1;
+ --glide-core-text-link: #73b2f3;

- --glide-core-text-link-dark-surface: #8babf1;
+ --glide-core-text-link-dark-surface: #73b2f3;

- --glide-core-text-link-table: #d0e8f2;
+ --glide-core-text-link-table: #73b2f3;

- --glide-core-text-primary: #ffffff;
+ --glide-core-text-primary: #73b2f3;

- --glide-core-text-primary-hover: #d7e7ff;
+ --glide-core-text-primary-hover: #4d99e7;

- --glide-core-text-secondary: #8babf1;
+ --glide-core-text-secondary: #3989da;

- --glide-core-text-selected: #ffffff;
+ --glide-core-text-selected: #f0f0f0;

- --glide-core-text-selected-2: #424242;
+ --glide-core-text-selected-2: #f0f0f0;

- --glide-core-text-tertiary: #ffffff;
+ --glide-core-text-tertiary: #f0f0f0;

- --glide-core-text-tertiary-disabled: #6d6d6d;
+ --glide-core-text-tertiary-disabled: #ffffff8c;
```

## Miscellaneous

### Added

```diff
+ --glide-core-shadow-checkbox: 0px 0px 7px 0px #5ba4ee;
+ --glide-core-shadow-md: 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 3px 1px 0px rgba(0, 0, 0, 0.06);
```

### Changed

```diff
- --glide-core-shadow-lg: 0px 4px 14px 0px #00000040;
+ --glide-core-shadow-lg: var(--glide-core-effects-shadow-large-x) var(--glide-core-effects-shadow-large-y) var(--glide-core-effects-shadow-large-blur) var(--glide-core-effects-shadow-large-spread) var(--glide-core-effects-shadow-large-fill);
- --glide-core-shadow-xl: 0px 4px 60px 0px #adadad;

+ --glide-core-shadow-xl: var(--glide-core-effects-shadow-xlarge-x) var(--glide-core-effects-shadow-xlarge-y) var(--glide-core-effects-shadow-xlarge-blur) var(--glide-core-effects-shadow-xlarge-spread) var(--glide-core-effects-shadow-xlarge-fill);
```

## System

## Removed

```diff
- --glide-core-page-size-width: 83.3125rem;
```
