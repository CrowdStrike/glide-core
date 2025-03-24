/// <reference types="vite/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  readonly VITE_GLIDE_CORE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
