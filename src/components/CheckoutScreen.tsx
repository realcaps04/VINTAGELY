import { useState } from 'react'
import { motion } from 'motion/react'
import { formatPrice, products } from '../data/catalog'
import { useShop } from '../store/shop'
import {
  ArrowRightIcon,
  BackIcon,
  ChevronRightIcon,
  EditIcon,
  MapPinIcon,
  MoreIcon,
  PlusIcon,
  TruckIcon,
} from './Icons'

const SHIPPING_OPTIONS = [
  { id: 'economy', label: 'Economy', detail: '5-7 days', price: 49 },
  { id: 'regular', label: 'Regular', detail: '3-4 days', price: 99 },
  { id: 'express', label: 'Express', detail: '1-2 days', price: 149 },
] as const

export function CheckoutScreen() {
  const { cart, cartTotal, closeCheckout, openProduct, selectedAddress, openAddressPicker } =
    useShop()
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [shippingId, setShippingId] = useState<(typeof SHIPPING_OPTIONS)[number]['id'] | null>(null)
  const [pickingShipping, setPickingShipping] = useState(false)

  const shipping = SHIPPING_OPTIONS.find((option) => option.id === shippingId) ?? null
  const discount = appliedPromo ? Math.round(cartTotal * 0.1) : 0
  const total = cartTotal - discount + (shipping?.price ?? 0)

  const applyPromo = () => {
    const code = promo.trim()
    if (!code) return
    setAppliedPromo(code.toUpperCase())
    setPromo('')
  }

  return (
    <motion.div
      className="relative min-h-dvh bg-[#f7f7f7] pb-44"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      <header className="grid grid-cols-[1fr_auto_1fr] items-center bg-[#f7f7f7] px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={closeCheckout}
          aria-label="Go back"
          className="justify-self-start p-1 text-ink transition-transform duration-200 active:scale-90"
        >
          <BackIcon />
        </button>
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Checkout</h1>
        <button
          type="button"
          aria-label="More options"
          className="grid h-10 w-10 place-items-center justify-self-end rounded-full border border-ink/15 text-ink transition-transform duration-200 active:scale-90"
        >
          <MoreIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="px-5 pt-2">
        <h2 className="text-[18px] font-bold tracking-[-0.01em]">Shipping Address</h2>
        <div className="mt-3.5 flex items-center gap-3.5 rounded-[28px] bg-white p-4 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white">
            <MapPinIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold tracking-[-0.01em]">{selectedAddress.label}</p>
            <p className="mt-0.5 truncate text-[13px] font-medium text-subtle">
              {selectedAddress.line}
            </p>
          </div>
          <button
            type="button"
            onClick={openAddressPicker}
            aria-label="Edit shipping address"
            className="shrink-0 p-1 text-ink transition-transform duration-200 active:scale-90"
          >
            <EditIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-[18px] font-bold tracking-[-0.01em]">Order List</h2>

          {cart.length === 0 ? (
            <p className="mt-8 text-center text-[14px] font-medium text-subtle">
              Your cart is empty.
            </p>
          ) : (
            <ul className="mt-3.5 space-y-3.5">
              {cart.map((line) => {
                const product = products.find((entry) => entry.id === line.productId)
                if (!product) return null

                return (
                  <li
                    key={line.id}
                    className="flex gap-3.5 rounded-[28px] bg-white p-3.5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]"
                  >
                    <button
                      type="button"
                      onClick={() => openProduct(product.id)}
                      className="grid h-[92px] w-[92px] shrink-0 place-items-center overflow-hidden rounded-[20px] bg-white"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>

                    <div className="min-w-0 flex-1 py-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => openProduct(product.id)}
                          className="min-w-0 text-left"
                        >
                          <h3 className="truncate text-[15px] font-bold tracking-[-0.01em]">
                            {product.name}
                          </h3>
                        </button>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[12px] font-bold tabular-nums">
                          {line.quantity}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-subtle">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-hairline"
                          style={{ backgroundColor: line.color }}
                          aria-hidden
                        />
                        <span className="truncate">
                          {line.colorLabel} | Size = {line.size}
                        </span>
                      </div>

                      <p className="mt-3 text-[16px] font-bold tracking-[-0.02em]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-[18px] font-bold tracking-[-0.01em]">Choose Shipping</h2>
          <button
            type="button"
            onClick={() => setPickingShipping((open) => !open)}
            className="mt-3.5 flex w-full items-center gap-3.5 rounded-[28px] bg-white p-4 text-left shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] transition-opacity duration-200 active:opacity-80"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white">
              <TruckIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold tracking-[-0.01em]">
                {shipping ? shipping.label : 'Choose Shipping Type'}
              </span>
              {shipping && (
                <span className="mt-0.5 block text-[13px] font-medium text-subtle">
                  {shipping.detail} · {formatPrice(shipping.price)}
                </span>
              )}
            </span>
            <ChevronRightIcon
              className={`h-5 w-5 text-ink transition-transform duration-200 ${
                pickingShipping ? 'rotate-90' : ''
              }`}
            />
          </button>

          {pickingShipping && (
            <ul className="mt-2 overflow-hidden rounded-[24px] bg-white shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]">
              {SHIPPING_OPTIONS.map((option, index) => {
                const isActive = option.id === shippingId
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setShippingId(option.id)
                        setPickingShipping(false)
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors duration-200 active:bg-surface ${
                        index > 0 ? 'border-t border-hairline' : ''
                      }`}
                    >
                      <span>
                        <span className="block text-[14px] font-semibold">{option.label}</span>
                        <span className="text-[12px] font-medium text-subtle">{option.detail}</span>
                      </span>
                      <span
                        className={`text-[14px] font-bold ${isActive ? 'text-ink' : 'text-subtle'}`}
                      >
                        {formatPrice(option.price)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-[18px] font-bold tracking-[-0.01em]">Promo Code</h2>
          <div className="mt-3.5 flex items-center gap-3">
            <input
              value={promo}
              onChange={(event) => setPromo(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyPromo()
              }}
              placeholder="Enter Promo Code"
              className="h-14 min-w-0 flex-1 rounded-full bg-surface px-5 text-[15px] font-medium text-ink outline-none placeholder:text-subtle"
            />
            <button
              type="button"
              onClick={applyPromo}
              aria-label="Add promo code"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-200 active:scale-95"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          {appliedPromo && (
            <p className="mt-2 px-1 text-[12.5px] font-medium text-subtle">
              Applied <span className="font-semibold text-ink">{appliedPromo}</span> · 10% off
            </p>
          )}
        </div>

        <div className="mt-6 space-y-3 px-1 pb-4 text-[15px] font-semibold">
          <div className="flex items-center justify-between">
            <span className="text-subtle">Amount</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-subtle">Shipping</span>
            <span>{shipping ? formatPrice(shipping.price) : '-'}</span>
          </div>
          {appliedPromo && (
            <div className="flex items-center justify-between">
              <span className="text-subtle">Promo</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[16px] font-bold">
            <span className="text-subtle">Total</span>
            <span>{shipping ? formatPrice(total) : '-'}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={cart.length === 0}
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-[16px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] transition-opacity duration-200 active:opacity-80 disabled:opacity-40"
        >
          Continue to Payment
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}
