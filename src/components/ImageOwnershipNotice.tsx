import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertIcon } from './Icons'

export function ImageOwnershipNotice({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tipId = useId()

  useEffect(() => {
    if (!open) return

    const close = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const timer = window.setTimeout(() => {
      document.addEventListener('pointerdown', close)
    }, 0)

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative z-10 ${className}`}>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setOpen((value) => !value)
        }}
        aria-label="Image ownership notice"
        aria-expanded={open}
        aria-controls={tipId}
        className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-ink shadow-[0_1px_6px_rgba(0,0,0,0.14)] transition-transform duration-200 active:scale-90"
      >
        <AlertIcon className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={tipId}
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-[calc(100%+6px)] left-0 w-[148px] rounded-xl bg-ink px-2.5 py-2 text-[10.5px] font-medium leading-snug text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)]"
          >
            Product images belong to their Brands.
            <span className="absolute -bottom-1 left-2.5 h-2 w-2 rotate-45 bg-ink" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
