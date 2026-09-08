import { useState, type ComponentType } from 'react'
import { motion } from 'motion/react'
import { formatPrice } from '../data/catalog'
import {
  shippingOptions,
  useShop,
  type ShippingOptionId,
} from '../store/shop'
import {
  BackIcon,
  ExpressTruckIcon,
  PackageCheckIcon,
  PackageIcon,
  TruckIcon,
} from './Icons'

const SHIPPING_ICONS: Record<ShippingOptionId, ComponentType<{ className?: string }>> = {
  economy: PackageCheckIcon,
  regular: PackageIcon,
  cargo: TruckIcon,
  express: ExpressTruckIcon,
}

export function ChooseShippingScreen() {
  const { selectedShippingId, setSelectedShippingId, closeShippingPicker } = useShop()
  const [draftId, setDraftId] = useState<ShippingOptionId>(selectedShippingId ?? 'regular')

  const apply = () => {
    setSelectedShippingId(draftId)
    closeShippingPicker()
  }

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col bg-white"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      <header className="flex items-center gap-3 bg-white px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={closeShippingPicker}
          aria-label="Go back"
          className="p-1 text-ink transition-transform duration-200 active:scale-90"
        >
          <BackIcon />
        </button>
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Choose Shipping</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-36 pt-2">
        <ul className="space-y-3.5">
          {shippingOptions.map((option) => {
            const selected = draftId === option.id
            const Icon = SHIPPING_ICONS[option.id]

            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => setDraftId(option.id)}
                  className="flex w-full items-center gap-3.5 rounded-[28px] bg-white p-4 text-left shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] transition-opacity duration-200 active:opacity-80"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-bold tracking-[-0.01em]">{option.label}</p>
                    <p className="mt-1 truncate text-[13px] font-medium text-subtle">
                      {option.arrival}
                    </p>
                  </div>

                  <p className="shrink-0 text-[15px] font-bold tracking-[-0.01em]">
                    {formatPrice(option.price)}
                  </p>

                  <span
                    aria-hidden
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                      selected ? 'border-ink' : 'border-ink/35'
                    }`}
                  >
                    {selected ? <span className="h-3 w-3 rounded-full bg-ink" /> : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent px-5 pt-10 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={apply}
          className="pointer-events-auto w-full rounded-full bg-ink py-4 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)] transition-opacity duration-200 active:opacity-80"
        >
          Apply
        </button>
      </div>
    </motion.div>
  )
}
