import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AUTH_STORAGE_KEY, googleClientId, isGoogleAuthConfigured } from '../config/auth'

export type AuthUser = {
  id: string
  name: string
  email: string
  picture: string
}

type AuthValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isGoogleReady: boolean
  isGoogleAuthConfigured: boolean
  signOut: () => void
  /** Mounts the official Google button into `container`. */
  renderGoogleButton: (container: HTMLElement) => void
}

const AuthContext = createContext<AuthValue | null>(null)

type GoogleCredentialResponse = { credential: string }

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string
    callback: (response: GoogleCredentialResponse) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
  }) => void
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: string
      theme?: string
      size?: string
      text?: string
      shape?: string
      width?: number
    },
  ) => void
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } }
  }
}

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (!parsed?.id || !parsed?.email) return null
    return parsed
  } catch {
    return null
  }
}

function decodeGoogleCredential(credential: string): AuthUser | null {
  try {
    const segment = credential.split('.')[1]
    if (!segment) return null
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    const payload = JSON.parse(json) as {
      sub?: string
      name?: string
      email?: string
      picture?: string
    }
    if (!payload.sub || !payload.email) return null
    return {
      id: payload.sub,
      name: payload.name?.trim() || payload.email.split('@')[0],
      email: payload.email,
      picture: payload.picture ?? '',
    }
  } catch {
    return null
  }
}

function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-google-gsi]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Google script failed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.dataset.googleGsi = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google script failed'))
    document.head.appendChild(script)
  })
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())
  const [isGoogleReady, setIsGoogleReady] = useState(false)

  const persistUser = useCallback((next: AuthUser | null) => {
    setUser(next)
    if (next) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const handleCredential = useCallback(
    (response: GoogleCredentialResponse) => {
      const next = decodeGoogleCredential(response.credential)
      if (next) persistUser(next)
    },
    [persistUser],
  )

  useEffect(() => {
    if (!isGoogleAuthConfigured) return

    let cancelled = false

    void loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google?.accounts?.id) return
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleCredential,
          auto_select: false,
          cancel_on_tap_outside: true,
        })
        setIsGoogleReady(true)
      })
      .catch(() => {
        if (!cancelled) setIsGoogleReady(false)
      })

    return () => {
      cancelled = true
    }
  }, [handleCredential])

  const signOut = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  const renderGoogleButton = useCallback(
    (container: HTMLElement) => {
      if (!isGoogleAuthConfigured || !window.google?.accounts?.id) return
      container.innerHTML = ''
      window.google.accounts.id.renderButton(container, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'pill',
        width: Math.min(320, container.clientWidth || 280),
      })
    },
    [],
  )

  const value = useMemo<AuthValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isGoogleReady,
      isGoogleAuthConfigured,
      signOut,
      renderGoogleButton,
    }),
    [user, isGoogleReady, signOut, renderGoogleButton],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
