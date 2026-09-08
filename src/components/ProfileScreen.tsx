import { useShop } from '../store/shop'
import { useAuth } from '../store/auth'
import {
  BellIcon,
  CartIcon,
  ChevronRightIcon,
  HeartIcon,
  HelpIcon,
  LogoutIcon,
  MapPinIcon,
  OrdersIcon,
  WalletIcon,
} from './Icons'

const menu = [
  { id: 'orders', label: 'My Orders', Icon: OrdersIcon, tab: 'orders' as const },
  { id: 'wishlist', label: 'Wishlist', Icon: HeartIcon },
  { id: 'address', label: 'Shipping Address', Icon: MapPinIcon },
  { id: 'payment', label: 'Payment Methods', Icon: WalletIcon },
  { id: 'cart', label: 'My Cart', Icon: CartIcon, tab: 'cart' as const },
  { id: 'notifications', label: 'Notifications', Icon: BellIcon },
  { id: 'help', label: 'Help Center', Icon: HelpIcon },
]

export function ProfileScreen() {
  const { user, signOut } = useAuth()
  const { wishlist, cartCount, setActiveTab } = useShop()

  if (!user) return null

  return (
    <div className="min-h-dvh bg-[#f7f7f7] pb-28">
      <header className="bg-white px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-6">
        <div className="flex items-center justify-between">
          <img src="/logo_main.png" alt="Vintagely" className="h-10 w-10 rounded-full object-cover" />
          <h1 className="text-[28px] font-bold tracking-[-0.03em]">Profile</h1>
          <span className="w-10" aria-hidden />
        </div>

        <div className="mt-7 flex items-center gap-4">
          <img
            src={user.picture || '/images/app/avatar.jpg'}
            alt=""
            referrerPolicy="no-referrer"
            className="h-20 w-20 rounded-full object-cover ring-4 ring-surface"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[22px] font-bold tracking-[-0.02em]">{user.name}</h2>
            <p className="mt-1 truncate text-[14px] font-medium text-subtle">{user.email}</p>
            <span className="mt-2 inline-flex rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink">
              Signed in with Google
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[22px] bg-surface px-4 py-3.5">
            <p className="text-[12px] font-medium text-subtle">Wishlist</p>
            <p className="mt-1 text-[20px] font-bold tracking-[-0.02em]">{wishlist.length}</p>
          </div>
          <div className="rounded-[22px] bg-surface px-4 py-3.5">
            <p className="text-[12px] font-medium text-subtle">Cart items</p>
            <p className="mt-1 text-[20px] font-bold tracking-[-0.02em]">{cartCount}</p>
          </div>
        </div>
      </header>

      <section className="mt-4 px-5">
        <ul className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]">
          {menu.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (item.tab) setActiveTab(item.tab)
                }}
                className={`flex w-full items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 active:bg-surface ${
                  index > 0 ? 'border-t border-hairline' : ''
                }`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink">
                  <item.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-semibold tracking-[-0.01em]">
                  {item.label}
                </span>
                {item.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold">
                    {wishlist.length}
                  </span>
                )}
                <ChevronRightIcon className="h-5 w-5 text-subtle" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={signOut}
          className="mt-4 flex w-full items-center gap-3.5 rounded-[28px] bg-white px-5 py-4 text-left shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] transition-colors duration-200 active:bg-surface"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-offer-500/10 text-offer-500">
            <LogoutIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 text-[15px] font-semibold tracking-[-0.01em] text-offer-500">
            Sign Out
          </span>
        </button>
      </section>
    </div>
  )
}
