import { motion } from 'motion/react'
import { useShop } from '../store/shop'
import { BellIcon, HeartIcon } from './Icons'

export function HomeHeader() {
  const { wishlist } = useShop()

  return (
    <header className="flex items-center gap-1 px-6 pt-4">
      <img
        src="/images/app/avatar.jpg"
        alt="Your profile"
        className="mr-auto h-12 w-12 shrink-0 rounded-full object-cover"
      />

      <button
        type="button"
        className="relative p-1 transition-transform duration-200 active:scale-90"
        aria-label="Notifications"
      >
        <BellIcon />
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
