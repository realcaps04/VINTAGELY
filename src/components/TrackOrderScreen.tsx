import { motion } from 'motion/react'
import { formatPrice } from '../data/catalog'
import { useShop } from '../store/shop'
import {
  BackIcon,
  CheckIcon,
  CourierIcon,
  MoreIcon,
  OpenBoxIcon,
  PackageIcon,
  TruckIcon,
} from './Icons'

const STAGES = [
  { id: 'packed', Icon: PackageIcon, label: 'Packed' },
  { id: 'transit', Icon: TruckIcon, label: 'In Transit' },
  { id: 'delivery', Icon: CourierIcon, label: 'Out for Delivery' },
  { id: 'delivered', Icon: OpenBoxIcon, label: 'Delivered' },
] as const

export function TrackOrderScreen() {
  const { trackingOrder, closeOrderTracking } = useShop()

  if (!trackingOrder) return null

  const stage = trackingOrder.progressStage

  return (
    <motion.div
      className="min-h-dvh bg-white pb-10"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={closeOrderTracking}
          aria-label="Go back"
          className="justify-self-start p-1 text-ink transition-transform duration-200 active:scale-90"
        >
          <BackIcon />
        </button>
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Track Order</h1>
        <button
          type="button"
          aria-label="More options"
          className="grid h-10 w-10 place-items-center justify-self-end rounded-full border border-ink/15 text-ink transition-transform duration-200 active:scale-90"
        >
          <MoreIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="px-5 pt-2">
        <div className="flex gap-3.5 rounded-[28px] bg-surface p-3.5">
          <div className="grid h-[92px] w-[92px] shrink-0 place-items-center overflow-hidden rounded-[20px] bg-white">
            <img src={trackingOrder.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 py-1">
            <h2 className="truncate text-[15px] font-bold tracking-[-0.01em]">
              {trackingOrder.name}
            </h2>
            <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-subtle">
              <span
                className="h-3 w-3 shrink-0 rounded-full border border-hairline"
                style={{ backgroundColor: trackingOrder.color }}
                aria-hidden
              />
              <span className="truncate">
                {trackingOrder.colorLabel} | Size = {trackingOrder.size} | Qty ={' '}
                {trackingOrder.quantity}
              </span>
            </div>
            <p className="mt-3 text-[16px] font-bold tracking-[-0.02em]">
              {formatPrice(trackingOrder.price)}
            </p>
          </div>
        </div>

        <div className="mt-8 px-1">
          <div className="flex items-start justify-between">
            {STAGES.map(({ id, Icon }, index) => {
              const done = index <= stage
              return (
                <div key={id} className="relative flex flex-1 flex-col items-center">
                  {index < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className={`absolute top-[46px] left-[calc(50%+18px)] h-0 w-[calc(100%-36px)] border-t-2 border-dashed ${
                        index < stage ? 'border-ink' : 'border-ink/20'
                      }`}
                    />
                  )}
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`mt-3 grid h-5 w-5 place-items-center rounded-full border-2 ${
                      done ? 'border-ink bg-ink text-white' : 'border-ink/25 text-transparent'
                    }`}
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-5 text-center text-[18px] font-bold tracking-[-0.02em]">
            {trackingOrder.statusLabel}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-[18px] font-bold tracking-[-0.01em]">Order Status Details</h3>
          <ol className="relative mt-5 space-y-0">
            {trackingOrder.tracking.map((event, index) => {
              const isLast = index === trackingOrder.tracking.length - 1
              return (
                <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute top-5 left-[9px] h-[calc(100%-8px)] border-l-2 border-dashed border-ink/25"
                    />
                  )}
                  <span className="relative z-10 mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink">
                    <span className="h-2 w-2 rounded-full bg-ink" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[14px] font-bold leading-snug tracking-[-0.01em]">
                        {event.title}
                      </p>
                      <span className="shrink-0 text-[12px] font-medium text-subtle">
                        {event.time}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] font-medium leading-relaxed text-subtle">
                      {event.address}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </motion.div>
  )
}
