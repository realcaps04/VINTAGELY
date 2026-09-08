import { motion } from 'motion/react'
import { useShop } from '../store/shop'
import { CartIcon, HomeIcon, OrdersIcon, ProfileIcon, WalletIcon } from './Icons'

const tabs = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'cart', label: 'Cart', Icon: CartIcon },
  { id: 'orders', label: 'Orders', Icon: OrdersIcon },
  { id: 'wallet', label: 'Wallet', Icon: WalletIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
] as const

const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 } as const

export function BottomNav() {
  const { activeTab, setActiveTab, cartCount } = useShop()

  return (
    // The wrapper is click-through so it never intercepts scrolling; only the
    // floating card itself takes pointer events.
    <div className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4 pb-2">
      <nav
        className="pointer-events-auto flex items-stretch gap-1 rounded-[26px] border border-hairline bg-white/90 px-2 py-2 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.16),0_2px_10px_-2px_rgba(0,0,0,0.06)] backdrop-blur-xl"
        aria-label="Primary"
      >
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1 rounded-[18px] px-1 py-2 transition-colors duration-300 ${
                isActive ? 'text-ink' : 'text-subtle'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-[18px] bg-surface"
                  transition={spring}
                />
              )}

              <motion.span
                className="relative"
                animate={{ scale: isActive ? 1.05 : 1, y: isActive ? -1 : 0 }}
                transition={spring}
              >
                <Icon className="h-6 w-6" active={isActive} />
                {id === 'cart' && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-offer-500 px-1 text-[9px] font-bold leading-none text-white">
                    {cartCount}
                  </span>
                )}
              </motion.span>

              <span
                className={`relative text-[12px] ${isActive ? 'font-semibold' : 'font-medium'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="flex justify-center pt-2.5">
        <span className="h-1 w-32 rounded-full bg-ink/85" />
      </div>
    </div>
  )
}
