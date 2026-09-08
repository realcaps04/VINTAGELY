import { useMemo, useState } from 'react'
import { formatPrice } from '../data/catalog'
import { useShop, type Order, type OrderBucket } from '../store/shop'
import { NotFoundIllustration } from './SearchEmpty'
import { MoreIcon, SearchIcon } from './Icons'

export function OrdersScreen() {
  const { orders, openSearch, openOrderTracking } = useShop()
  const [bucket, setBucket] = useState<OrderBucket>('active')

  const visible = useMemo(
    () => orders.filter((order) => order.bucket === bucket),
    [orders, bucket],
  )

  return (
    <div className="min-h-dvh bg-white pb-28">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <img
          src="/logo_main.png"
          alt="Vintagely"
          className="h-10 w-10 justify-self-start rounded-full object-cover"
        />
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">My Orders</h1>
        <div className="flex items-center justify-self-end gap-1">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="p-1 text-ink transition-transform duration-200 active:scale-90"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-transform duration-200 active:scale-90"
          >
            <MoreIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="mt-1 grid grid-cols-2 border-b border-hairline px-5">
        {(['active', 'completed'] as const).map((tab) => {
          const active = bucket === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setBucket(tab)}
              className={`relative pb-3 text-[16px] font-semibold capitalize transition-colors duration-200 ${
                active ? 'text-ink' : 'text-subtle'
              }`}
            >
              {tab}
              {active && (
                <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-ink" />
              )}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center px-8 pt-20 text-center">
          <NotFoundIllustration className="h-40 w-40" />
          <h2 className="mt-8 text-[24px] font-bold tracking-[-0.02em]">
            You don&apos;t have an order yet
          </h2>
          <p className="mt-3 max-w-[280px] text-[14px] font-medium leading-relaxed text-subtle">
            {bucket === 'active'
              ? "You don't have an active order at this time."
              : "You don't have any completed orders yet."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3.5 px-5 pt-5">
          {visible.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} onTrack={() => openOrderTracking(order.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function OrderCard({ order, onTrack }: { order: Order; onTrack: () => void }) {
  return (
    <article className="rounded-[28px] bg-white p-3.5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]">
      <div className="flex gap-3.5">
        <div className="grid h-[92px] w-[92px] shrink-0 place-items-center overflow-hidden rounded-[20px] bg-surface">
          <img src={order.image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1 py-0.5">
          <h3 className="truncate text-[15px] font-bold tracking-[-0.01em]">{order.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-subtle">
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-hairline"
              style={{ backgroundColor: order.color }}
              aria-hidden
            />
            <span className="truncate">
              {order.colorLabel} | Size = {order.size} | Qty = {order.quantity}
            </span>
          </div>
          <span className="mt-2.5 inline-flex rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink/70">
            {order.badge}
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3 px-0.5">
        <p className="text-[18px] font-bold tracking-[-0.02em]">{formatPrice(order.price)}</p>
        {order.bucket === 'active' ? (
          <button
            type="button"
            onClick={onTrack}
            className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold text-white transition-opacity duration-200 active:opacity-80"
          >
            Track Order
          </button>
        ) : (
          <span className="rounded-full bg-surface px-5 py-2.5 text-[13px] font-bold text-ink">
            Completed
          </span>
        )}
      </div>
    </article>
  )
}
