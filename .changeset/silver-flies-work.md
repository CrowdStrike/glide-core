---
'@crowdstrike/glide-core': minor
---

`@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

## Colors (Light)

```diff
- --glide-core-color-success-surface-container: #f1fdf4;
+ --glide-core-color-advisory-surface-success-container: #f1fdf4;

- --glide-core-color-success-surface-container-light: #f5fcf7;
+ --glide-core-color-advisory-surface-success-container-light: #f5fcf7;

- --glide-core-color-success-surface-solid: #34c759;
+ --glide-core-color-advisory-surface-success-solid: #34c759;

- --glide-core-color-success-surface-solid--hover: #248b3e;
+ --glide-core-color-advisory-surface-success-solid--hover: #248b3e;

- --glide-core-color-success-stroke-primary: #34c759;
+ --glide-core-color-advisory-stroke-success-primary: #34c759;

- --glide-core-color-success-stroke-secondary: #d6f4de;
+ --glide-core-color-advisory-stroke-success-secondary: #d6f4de;

- --glide-core-color-success-text-status: #34c759;
+ --glide-core-color-advisory-text-success: #34c759;

- --glide-core-color-success-text-container: #212121;
+ --glide-core-color-advisory-text-success-container: #212121;

- --glide-core-color-success-icon-default: #34c759;
+ --glide-core-color-advisory-icon-success: #34c759;

- --glide-core-color-attention-surface-container: #fffbeb;
+ --glide-core-color-advisory-surface-attention-container: #fffbeb;

- --glide-core-color-attention-surface-container-light: #fffcf2;
+ --glide-core-color-advisory-surface-attention-container-light: #fffcf2;

- --glide-core-color-attention-surface-solid: #ffcc00;
+ --glide-core-color-advisory-surface-attention-solid: #ffcc00;

- --glide-core-color-attention-surface-solid--hover: #b28f00;
+ --glide-core-color-advisory-surface-attention-solid--hover: #b28f00;

- --glide-core-color-attention-stroke-primary: #ffcc00;
+ --glide-core-color-advisory-stroke-attention-primary: #ffcc00;

- --glide-core-color-attention-stroke-secondary: #fff5cc;
+ --glide-core-color-advisory-stroke-attention-secondary: #ffcc00;

- --glide-core-color-attention-text-status: #ffcc00;
+ --glide-core-color-advisory-text-attention: #ffcc00;

- --glide-core-color-attention-text-container: #212121;
+ --glide-core-color-advisory-text-attention-container: #212121;

- --glide-core-color-attention-icon-default: #ffcc00;
+ --glide-core-color-advisory-icon-attention: #ffcc00;

- --glide-core-color-warning-surface-container: #fff6e9;
+ --glide-core-color-advisory-surface-warning-container: #fff6e9;

- --glide-core-color-warning-surface-container-light: #fffaf2;
+ --glide-core-color-advisory-surface-warning-container-light: #fffaf2;

- --glide-core-color-warning-surface-solid: #ff9500;
+ --glide-core-color-advisory-surface-warning-solid: #ff9500;

- --glide-core-color-warning-surface-solid--hover: #b26800;
+ --glide-core-color-advisory-surface-warning-solid--hover: #b26800;

- --glide-core-color-warning-stroke-primary: #ff9500;
+ --glide-core-color-advisory-stroke-warning-primary: #ff9500;

- --glide-core-color-warning-stroke-secondary: #ffeacc;
+ --glide-core-color-advisory-stroke-warning-secondary: #ffbf66;

- --glide-core-color-warning-text-status: #ff9500;
+ --glide-core-color-advisory-text-warning: #ff9500;

- --glide-core-color-warning-text-container: #212121;
+ --glide-core-color-advisory-text-warning-container: #212121;

- --glide-core-color-warning-icon-default: #ff9500;
+ --glide-core-color-advisory-icon-warning: #ff9500;

- --glide-core-color-info-surface-container: #e5f1fc;
+ --glide-core-color-advisory-surface-info-container: #e5f1fc;

- --glide-core-color-info-surface-container-light: #f2f8fe;
+ --glide-core-color-advisory-surface-info-container-light: #f2f8fe;

- --glide-core-color-info-surface-solid: #0073e6;
+ --glide-core-color-advisory-surface-info-solid: #0073e6;

- --glide-core-color-info-surface-solid--hover: #0051a1;
+ --glide-core-color-advisory-surface-info-solid--hover: #0051a1;

- --glide-core-color-info-stroke-primary: #0073e6;
+ --glide-core-color-advisory-stroke-info-primary: #0073e6;

- --glide-core-color-info-stroke-secondary: #cce3fa;
+ --glide-core-color-advisory-stroke-info-secondary: #99c7f5;

- --glide-core-color-info-text-status: #0073e6;
+ --glide-core-color-advisory-text-info: #0073e6;

- --glide-core-color-info-text-container: #212121;
+ --glide-core-color-advisory-text-info-container: #212121;

- --glide-core-color-info-icon-default: #0073e6;
+ --glide-core-color-advisory-icon-info: #0073e6;

- --glide-core-color-error-surface-container: #fff0ef;
+ --glide-core-color-advisory-surface-error-container: #fff0ef;

- --glide-core-color-error-surface-container-light: #fdf4f4;
+ --glide-core-color-advisory-surface-error-container-light: #fdf4f4;

- --glide-core-color-error-surface-solid: #db2d24;
+ --glide-core-color-advisory-surface-error-solid: #db2d24;

- --glide-core-color-error-surface-solid--hover: #992019;
+ --glide-core-color-advisory-surface-error-solid--hover: #992019;

- --glide-core-color-error-stroke-primary: #db2d24;
+ --glide-core-color-advisory-stroke-error-primary: #db2d24;

- --glide-core-color-error-stroke-secondary: #f8d5d3;
+ --glide-core-color-advisory-stroke-error-secondary: #f8d5d3;

- --glide-core-color-error-text-status: #db2d24;
+ --glide-core-color-advisory-text-error: #db2d24;

- --glide-core-color-error-text-container: #212121;
+ --glide-core-color-advisory-text-error-container: #212121;

- --glide-core-color-error-icon-default: #db2d24;
+ --glide-core-color-advisory-icon-error: #db2d24;
```

## Colors (Dark)

```diff
- --glide-core-color-success-surface-container: #1c261e;
+ --glide-core-color-advisory-surface-success-container: #1c261e;

- --glide-core-color-success-surface-container-light: #181d19;
+ --glide-core-color-advisory-surface-success-container-light: #181d19;

- --glide-core-color-success-surface-solid: #61c479;
+ --glide-core-color-advisory-surface-success-solid: #61c479;

- --glide-core-color-success-surface-solid--hover: #90d6a1;
+ --glide-core-color-advisory-surface-success-solid--hover: #90d6a1;

- --glide-core-color-success-stroke-primary: #61c479;
+ --glide-core-color-advisory-stroke-success-primary: #61c479;

- --glide-core-color-success-stroke-secondary: #233728;
+ --glide-core-color-advisory-stroke-success-secondary: #233728;

- --glide-core-color-success-text-status: #61c479;
+ --glide-core-color-advisory-text-success: #61c479;

- --glide-core-color-success-text-container: #dcdcdc;
+ --glide-core-color-advisory-text-success-container: #dcdcdc;

- --glide-core-color-success-icon-default: #61c479;
+ --glide-core-color-advisory-icon-success: #61c479;

- --glide-core-color-attention-surface-container: #2a271a;
+ --glide-core-color-advisory-surface-attention-container: #2a271a;

- --glide-core-color-attention-surface-container-light: #1f1d17;
+ --glide-core-color-advisory-surface-attention-container-light: #1f1d17;

- --glide-core-color-attention-surface-solid: #f0cf4f;
+ --glide-core-color-advisory-surface-attention-solid: #f0cf4f;

- --glide-core-color-attention-surface-solid--hover: #f5dd84;
+ --glide-core-color-advisory-surface-attention-solid--hover: #f5dd84;

- --glide-core-color-attention-stroke-primary: #f0cf4f;
+ --glide-core-color-advisory-stroke-attention-primary: #f0cf4f;

- --glide-core-color-attention-stroke-secondary: #403920;
+ --glide-core-color-advisory-stroke-attention-secondary: #f0cf4f;

- --glide-core-color-attention-text-status: #f0cf4f;
+ --glide-core-color-advisory-text-attention: #f0cf4f;

- --glide-core-color-attention-text-container: #dcdcdc;
+ --glide-core-color-advisory-text-attention-container: #dcdcdc;

- --glide-core-color-attention-icon-default: #f0cf4f;
+ --glide-core-color-advisory-icon-attention: #f0cf4f;

- --glide-core-color-warning-surface-container: #2c241a;
+ --glide-core-color-advisory-surface-warning-container: #2c241a;

- --glide-core-color-warning-surface-container-light: #201c17;
+ --glide-core-color-advisory-surface-warning-container-light: #201c17;

- --glide-core-color-warning-surface-solid: #ffb64f;
+ --glide-core-color-advisory-surface-warning-solid: #ffb64f;

- --glide-core-color-warning-surface-solid--hover: #ffcc84;
+ --glide-core-color-advisory-surface-warning-solid--hover: #ffcc84;

- --glide-core-color-warning-stroke-primary: #ffb64f;
+ --glide-core-color-advisory-stroke-warning-primary: #ffb64f;

- --glide-core-color-warning-stroke-secondary: #433420;
+ --glide-core-color-advisory-stroke-warning-secondary: #a17537;

- --glide-core-color-warning-text-status: #ffb64f;
+ --glide-core-color-advisory-text-warning: #ffb64f;

- --glide-core-color-warning-text-container: #dcdcdc;
+ --glide-core-color-advisory-text-warning-container: #dcdcdc;

- --glide-core-color-warning-icon-default: #ffb64f;
+ --glide-core-color-advisory-icon-warning: #ffb64f;

- --glide-core-color-info-surface-container: #171f26;
+ --glide-core-color-advisory-surface-info-container: #171f26;

- --glide-core-color-info-surface-container-light: #15191d;
+ --glide-core-color-advisory-surface-info-container-light: #192939;

- --glide-core-color-info-surface-solid: #2d7dcc;
+ --glide-core-color-advisory-surface-info-solid: #2d7dcc;

- --glide-core-color-info-surface-solid--hover: #6ca4db;
+ --glide-core-color-advisory-surface-info-solid--hover: #6ca4db;

- --glide-core-color-info-stroke-primary: #2d7dcc;
+ --glide-core-color-advisory-stroke-info-primary: #2d7dcc;

- --glide-core-color-info-stroke-secondary: #192939;
+ --glide-core-color-advisory-stroke-info-secondary: #2d7dcc;

- --glide-core-color-info-text-status: #2d7dcc;
+ --glide-core-color-advisory-text-info: #2d7dcc;

- --glide-core-color-info-text-container: #dcdcdc;
+ --glide-core-color-advisory-text-info-container: #dcdcdc;

- --glide-core-color-info-icon-default: #2d7dcc;
+ --glide-core-color-advisory-icon-info: #2d7dcc;

- --glide-core-color-error-surface-container: #291d1c;
+ --glide-core-color-advisory-surface-error-container: #291d1c;

- --glide-core-color-error-surface-container-light: #1e1818;
+ --glide-core-color-advisory-surface-error-container-light: #1e1818;

- --glide-core-color-error-surface-solid: #e36963;
+ --glide-core-color-advisory-surface-error-solid: #e36963;

- --glide-core-color-error-surface-solid--hover: #eb9692;
+ --glide-core-color-advisory-surface-error-solid--hover: #eb9692;

- --glide-core-color-error-stroke-primary: #e36963;
+ --glide-core-color-advisory-stroke-error-primary: #e36963;

- --glide-core-color-error-stroke-secondary: #3d2524;
+ --glide-core-color-advisory-stroke-error-secondary: #3d2524;

- --glide-core-color-error-text-status: #e36963;
+ --glide-core-color-advisory-text-error: #e36963;

- --glide-core-color-error-text-container: #dcdcdc;
+ --glide-core-color-advisory-text-error-container: #dcdcdc;

- --glide-core-color-error-icon-default: #e36963;
+ --glide-core-color-advisory-icon-error: #e36963;
```
