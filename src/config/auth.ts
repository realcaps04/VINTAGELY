/**
 * Google Sign-In configuration.
 *
 * Sign-in itself is not built yet — this only reads the credential so that the
 * rest of the app never touches `import.meta.env` directly and there is a
 * single place to check before rendering any Google button.
 */

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? ''

/** False when `.env` has no client ID, so sign-in UI can stay hidden. */
export const isGoogleAuthConfigured = googleClientId.length > 0
