import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { applyUpdate, useAppUpdate } from '../hooks/useAppUpdate'
import { DownloadIcon } from './Icons'

/**
 * Blocking update prompt. There is no dismiss affordance by design: once a new
 * version is published the running client must reload before it can be used.
 */
export function UpdateGate() {
  const { updateRequired } = useAppUpdate()
  const [isApplying, setIsApplying] = useState(false)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!updateRequired) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    confirmRef.current?.focus()

    // Keep focus inside the dialog so the app behind stays unreachable.
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        confirmRef.current?.focus()
      }
    }

    window.addEventListener('keydown', trapFocus)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', trapFocus)
    }
  }, [updateRequired])

  const handleUpdate = () => {
    setIsApplying(true)
    void applyUpdate()
  }

  return (
    <AnimatePresence>
      {updateRequired && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/45 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="update-title"
            aria-describedby="update-body"
            className="w-full max-w-[350px] rounded-[26px] bg-white p-7 text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface text-ink">
              <DownloadIcon className="h-6 w-6" />
            </span>

            <p className="mt-5 text-[13px] font-semibold text-subtle">Update Required</p>

            <h2 id="update-title" className="mt-2 text-[22px] font-bold tracking-[-0.02em]">
              A new version is available
            </h2>

            <p id="update-body" className="mt-2.5 text-[14px] leading-relaxed text-subtle">
              Update now to continue using Vintagely.
            </p>

            <button
              ref={confirmRef}
              type="button"
              onClick={handleUpdate}
              disabled={isApplying}
              className="mt-6 w-full rounded-2xl bg-ink py-4 text-[15px] font-semibold text-white transition-opacity duration-200 active:opacity-80 disabled:opacity-60"
            >
              {isApplying ? 'Updating…' : 'Update Now'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
