import { useState } from 'react'
import { motion } from 'motion/react'
import { shippingAddresses, useShop } from '../store/shop'
import { BackIcon, MapPinIcon } from './Icons'

export function ShippingAddressScreen() {
  const { selectedAddressId, setSelectedAddressId, closeAddressPicker } = useShop()
  const [draftId, setDraftId] = useState(selectedAddressId)

  const apply = () => {
    setSelectedAddressId(draftId)
    closeAddressPicker()
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
          onClick={closeAddressPicker}
          aria-label="Go back"
          className="p-1 text-ink transition-transform duration-200 active:scale-90"
        >
          <BackIcon />
        </button>
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Shipping Address</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-36 pt-2">
        <ul className="space-y-3.5">
          {shippingAddresses.map((address) => {
            const selected = draftId === address.id

            return (
              <li key={address.id}>
                <button
                  type="button"
                  onClick={() => setDraftId(address.id)}
                  className="flex w-full items-center gap-3.5 rounded-[28px] bg-white p-4 text-left shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] transition-opacity duration-200 active:opacity-80"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#f3f3f3]">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
                      <MapPinIcon className="h-5 w-5" />
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-bold tracking-[-0.01em]">{address.label}</p>
                      {address.isDefault ? (
                        <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-[11px] font-semibold text-ink/70">
                          Default
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 truncate text-[13px] font-medium text-subtle">
                      {address.line}
                    </p>
                  </div>

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

        <button
          type="button"
          className="mt-5 w-full rounded-full bg-[#eeeeee] py-4 text-[15px] font-bold text-ink transition-opacity duration-200 active:opacity-70"
        >
          Add New Address
        </button>
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
