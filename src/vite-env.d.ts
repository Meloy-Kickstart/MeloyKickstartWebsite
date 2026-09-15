/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_DISCORD_INVITE?: string;
  readonly VITE_INSTAGRAM_FEED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
