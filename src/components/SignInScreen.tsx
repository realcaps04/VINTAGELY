import { useEffect, useRef } from 'react'
import { useAuth } from '../store/auth'

/**
 * Gate shown on the Profile tab until Google sign-in completes.
 * Profile content is never rendered from here — only the sign-in surface.
 */
export function SignInScreen() {
  const { isGoogleAuthConfigured, isGoogleReady, renderGoogleButton } = useAuth()
  const buttonHost = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isGoogleReady || !buttonHost.current) return
    renderGoogleButton(buttonHost.current)
  }, [isGoogleReady, renderGoogleButton])

  return (
    <div className="flex min-h-dvh flex-col bg-white px-6 pb-28 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <img src="/logo_main.png" alt="Vintagely" className="h-10 w-10 rounded-full object-cover" />
        <h1 className="text-[22px] font-bold tracking-[-0.02em]">Profile</h1>
        <span className="w-10" aria-hidden />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-surface">
          <img src="/logo_main.png" alt="" className="h-14 w-14 rounded-full object-cover" />
        </div>

        <h2 className="mt-7 text-[26px] font-bold tracking-[-0.03em]">Sign in to continue</h2>
        <p className="mt-2.5 max-w-[280px] text-[14px] font-medium leading-relaxed text-subtle">
          Your profile is only available after Google login is completed.
        </p>

        <div className="mt-8 w-full max-w-[320px]">
          {!isGoogleAuthConfigured ? (
            <div className="rounded-[24px] bg-surface px-5 py-5 text-left">
              <p className="text-[14px] font-semibold text-ink">Google sign-in is not configured</p>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-subtle">
                Add your web client ID to <code className="text-ink">VITE_GOOGLE_CLIENT_ID</code> in
                `.env`, then restart the dev server.
              </p>
            </div>
          ) : (
            <>
              <div ref={buttonHost} className="flex min-h-12 justify-center" />
              {!isGoogleReady && (
                <p className="mt-3 text-[13px] font-medium text-subtle">Loading Google sign-in…</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
