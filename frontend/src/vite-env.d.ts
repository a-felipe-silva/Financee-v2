/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TEST_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
