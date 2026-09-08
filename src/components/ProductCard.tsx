import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Product } from '../data/catalog'
import { formatPrice, formatSold } from '../data/catalog'
import { useShop } from '../store/shop'
import { AlertIcon, HeartIcon, StarIcon } from './Icons'

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useShop()
  const wishlisted = isWishlisted(product.id)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const noticeRef = useRef<HTMLDivElement>(null)
  const noticeId = useId()

  useEffect(() => {
    if (!noticeOpen) return

    const close = (event: PointerEvent) => {
      if (noticeRef.current?.contains(event.target as Node)) return
      setNoticeOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNoticeOpen(false)
    }

    // Defer so the opening click itself doesn't immediately dismiss it.
    const timer = window.setTimeout(() => {
      document.addEventListener('pointerdown', close)
    }, 0)

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [noticeOpen])

  return (
    <article className="group">
      <div className="relative">
        <div className="overflow-hidden rounded-[20px] bg-surface">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div ref={noticeRef} className="absolute bottom-2 left-2 z-10">
          <button
            type="button"
            onClick={() => setNoticeOpen((open) => !open)}
            aria-label="Image ownership notice"
            aria-expanded={noticeOpen}
            aria-controls={noticeId}
            className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-ink shadow-[0_1px_6px_rgba(0,0,0,0.14)] transition-transform duration-200 active:scale-90"
          >
            <AlertIcon className="h-3.5 w-3.5" strokeWidth={2} />
          </button>

          <AnimatePresence>
            {noticeOpen && (
              <motion.div
                id={noticeId}
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

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={wishlisted}
          className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 active:scale-90"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={wishlisted ? 'on' : 'off'}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 24 }}
              className={wishlisted ? 'text-offer-500' : 'text-ink'}
            >
              <HeartIcon className="h-[17px] w-[17px]" strokeWidth={1.9} filled={wishlisted} />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <h3 className="mt-3 truncate text-[16px] font-semibold tracking-[-0.01em]">{product.name}</h3>

      <div className="mt-2 flex items-center gap-2">
        <StarIcon className="h-3.5 w-3.5 text-ink" />
        <span className="text-[13px] font-semibold leading-none">{product.rating.toFixed(1)}</span>
        <span className="h-3 w-px bg-hairline" />
        <span className="text-[12px] font-medium leading-none text-subtle">
          {formatSold(product.sold)} sold
        </span>
      </div>

      <p className="mt-2 text-[18px] font-bold tracking-[-0.02em]">{formatPrice(product.price)}</p>
    </article>
  )
}
