import { useShop } from '../store/shop'
import { CartIcon, HomeIcon, OrdersIcon, ProfileIcon, WalletIcon } from './Icons'

const tabs = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'cart', label: 'Cart', Icon: CartIcon },
  { id: 'orders', label: 'Orders', Icon: OrdersIcon },
  { id: 'wallet', label: 'Wallet', Icon: WalletIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
] as const

export function BottomNav() {
  const { activeTab, setActiveTab, cartCount } = useShop()

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-hairline bg-white/95 backdrop-blur-md"
      aria-label="Primary"
    >
      <div className="flex items-stretch justify-around px-2 pt-2.5">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1.5 pb-1 transition-colors duration-300 ${
                isActive ? 'text-ink' : 'text-subtle'
              }`}
            >
              <span className="relative">
                <Icon className="h-6 w-6" active={isActive} />
                {id === 'cart' && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-offer-500 px-1 text-[9px] font-bold leading-none text-white">
                    {cartCount}
                  </span>
                )}
              </span>

              <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center pb-2 pt-1.5">
        <span className="h-1 w-32 rounded-full bg-ink" />
      </div>
    </nav>
  )
}
