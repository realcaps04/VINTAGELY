import { useEffect, useState } from 'react'

const POLL_INTERVAL_MS = 60_000

async function fetchDeployedVersion(signal: AbortSignal): Promise<string | undefined> {
  const response = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store', signal })
  if (!response.ok) throw new Error(`Version check failed with ${response.status}`)
  const payload = (await response.json()) as { version?: string }
  return payload.version
}

/**
 * Watches the deployed version and reports when it no longer matches the build
 * this client is running. Polls on an interval and whenever the tab regains
 * focus, then stops once an update has been found.
 */
export function useAppUpdate() {
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  useEffect(() => {
    // `__APP_VERSION__` is frozen when the dev server boots, but /version.json is
    // read from package.json on every request. Bumping the version mid-session
    // therefore leaves the two permanently out of step, and since the prompt has
    // no dismiss affordance it becomes a modal that reloading can never clear.
    // The gate only means anything for a real build, so dev opts out entirely.
    if (import.meta.env.DEV) return
    if (latestVersion) return

    const controller = new AbortController()

    const check = async () => {
      try {
        const deployed = await fetchDeployedVersion(controller.signal)
        if (deployed && deployed !== __APP_VERSION__) setLatestVersion(deployed)
      } catch {
        // Offline, or the manifest is briefly unavailable mid-deploy. Retry later.
      }
    }

    const checkIfVisible = () => {
      if (document.visibilityState === 'visible') void check()
    }

    void check()
    const timer = window.setInterval(check, POLL_INTERVAL_MS)
    document.addEventListener('visibilitychange', checkIfVisible)
    window.addEventListener('focus', checkIfVisible)

    return () => {
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', checkIfVisible)
      window.removeEventListener('focus', checkIfVisible)
    }
  }, [latestVersion])

  return {
    currentVersion: __APP_VERSION__,
    latestVersion,
    updateRequired: latestVersion !== null,
  }
}

/**
 * Drops any cached shell so the reload genuinely fetches the new build rather
 * than replaying the version the client is already running.
 */
export async function applyUpdate() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((registration) => registration.unregister()))
    }
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
    }
  } catch {
    // Best effort only — reload regardless of what could be cleared.
  }
  window.location.reload()
}
