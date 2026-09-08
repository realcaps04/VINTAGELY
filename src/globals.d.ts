/** Build-time version baked in by Vite, compared against /version.json. */
declare const __APP_VERSION__: string

interface ImportMetaEnv {
  /** Google Sign-In web client ID. Optional: absent until sign-in is built. */
  readonly VITE_GOOGLE_CLIENT_ID?: string
}
