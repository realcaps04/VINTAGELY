import { motion } from 'motion/react'
import { useShop } from '../store/shop'
import { BellIcon, HeartIcon } from './Icons'

export function HomeHeader() {
  const { wishlist } = useShop()

  return (
    <header className="flex items-center gap-3.5 px-6 pt-4">
      <img
        src="/images/app/avatar.jpg"
        alt="Andrew Ainsley"
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-subtle">Good Morning 👋</p>
        <h1 className="truncate text-[19px] font-bold leading-tight tracking-[-0.01em]">
          Andrew Ainsley
        </h1>
      </div>

      <button
        type="button"
        className="relative p-1 transition-transform duration-200 active:scale-90"
        aria-label="Notifications"
      >
        <BellIcon />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-offer-500" />
      </button>

      <button
        type="button"
        className="relative p-1 transition-transform duration-200 active:scale-90"
        aria-label={`Wishlist, ${wishlist.length} items`}
      >
        <HeartIcon />
        {wishlist.length > 0 && (
          <motion.span
            key={wishlist.length}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-offer-500 px-1 text-[9px] font-bold leading-none text-white"
          >
            {wishlist.length}
          </motion.span>
        )}
      </button>
    </header>
  )
}
