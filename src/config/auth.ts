/**
 * Google Sign-In configuration.
 *
 * Reads the public web client ID from Vite env. Profile is locked behind a
 * completed Google login once this value is set.
 */

export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? ''

/** False when `.env` has no client ID — the sign-in button stays disabled. */
export const isGoogleAuthConfigured = googleClientId.length > 0

export const AUTH_STORAGE_KEY = 'vintagely.auth.user'
