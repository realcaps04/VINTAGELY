import { motion } from 'motion/react'
import { useAuth } from '../store/auth'
import { useShop } from '../store/shop'
import { BellIcon, HeartIcon, SearchIcon } from './Icons'

export function HomeHeader() {
  const { user, isAuthenticated } = useAuth()
  const { wishlist, openSearch, setActiveTab } = useShop()

  return (
    // Three tracks so the logo stays optically centred regardless of the
    // differing widths of the avatar and the action icons.
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <button
        type="button"
        onClick={() => setActiveTab('profile')}
        aria-label={isAuthenticated ? 'Open profile' : 'Sign in to open profile'}
        className="justify-self-start transition-transform duration-200 active:scale-95"
      >
        <img
          src={isAuthenticated && user?.picture ? user.picture : '/images/app/avatar.jpg'}
          alt=""
          referrerPolicy="no-referrer"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
      </button>

      <img
        src="/logo_main.png"
        alt="Vintagely"
        className="h-11 w-11 rounded-full object-cover"
      />

      <div className="flex items-center gap-1 justify-self-end">
        <button
          type="button"
          onClick={openSearch}
          className="relative p-1 transition-transform duration-200 active:scale-90"
          aria-label="Search"
        >
          <SearchIcon className="h-6 w-6" />
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

        <button
          type="button"
          className="relative p-1 transition-transform duration-200 active:scale-90"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
      </div>
    </header>
  )
}
