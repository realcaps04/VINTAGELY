import { AnimatePresence, motion } from 'motion/react'
import type { Product } from '../data/catalog'
import { formatPrice, formatSold } from '../data/catalog'
import { useShop } from '../store/shop'
import { HeartIcon, StarIcon } from './Icons'

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useShop()
  const wishlisted = isWishlisted(product.id)

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-[20px] bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          aria-pressed={wishlisted}
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 active:scale-90"
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

      <h3 className="mt-3 truncate text-[15px] font-bold tracking-[-0.01em]">{product.name}</h3>

      <div className="mt-1.5 flex items-center gap-2">
        <StarIcon className="h-3.5 w-3.5 text-ink" />
        <span className="text-[12px] font-bold leading-none">{product.rating.toFixed(1)}</span>
        <span className="h-3 w-px bg-hairline" />
        <span className="text-[11px] font-medium leading-none text-subtle">
          {formatSold(product.sold)} sold
        </span>
      </div>

      <p className="mt-1.5 text-[17px] font-extrabold tracking-[-0.01em]">
        {formatPrice(product.price)}
      </p>
    </article>
  )
}
