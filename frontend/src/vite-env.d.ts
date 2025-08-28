/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly TEST_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
