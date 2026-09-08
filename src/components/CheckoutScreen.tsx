import { useState, type ComponentType } from 'react'
import { motion } from 'motion/react'
import { formatPrice, products } from '../data/catalog'
import { useShop, type ShippingOptionId } from '../store/shop'
import {
  ArrowRightIcon,
  BackIcon,
  CloseIcon,
  EditIcon,
  ExpressTruckIcon,
  MapPinIcon,
  MoreIcon,
  PackageCheckIcon,
  PackageIcon,
  PlusIcon,
  TruckIcon,
} from './Icons'

const PROMO_RATE = 0.3

const SHIPPING_ICONS: Record<ShippingOptionId, ComponentType<{ className?: string }>> = {
  economy: PackageCheckIcon,
  regular: PackageIcon,
  cargo: TruckIcon,
  express: ExpressTruckIcon,
}

export function CheckoutScreen() {
  const {
    cart,
    cartTotal,
    closeCheckout,
    openProduct,
    selectedAddress,
    openAddressPicker,
    selectedShipping,
    openShippingPicker,
    placeOrder,
  } = useShop()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const discount = promoApplied ? Math.round(cartTotal * PROMO_RATE) : 0
  const shippingCost = selectedShipping?.price ?? 0
  const total = cartTotal - discount + shippingCost
  const ShippingIcon = selectedShipping
    ? SHIPPING_ICONS[selectedShipping.id]
    : TruckIcon

  const applyPromo = () => {
    if (promoApplied) return
    const code = promo.trim()
    if (!code) {
      setPromoApplied(true)
      return
    }
    setPromoApplied(true)
    setPromo('')
  }

  const clearPromo = () => {
    setPromoApplied(false)
    setPromo('')
  }

  return (
    <motion.div
      className="relative min-h-dvh bg-white pb-44"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      <header className="grid grid-cols-[1fr_auto_1fr] items-center bg-white px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
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

                      <p className="mt-1.5 truncate text-[12.5px] font-medium text-subtle">
                        {line.colorLabel} | Size = {line.size}
                      </p>

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
            onClick={openShippingPicker}
            className="mt-3.5 flex w-full items-center gap-3.5 rounded-[28px] bg-white p-4 text-left shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)] transition-opacity duration-200 active:opacity-80"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white">
              <ShippingIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold tracking-[-0.01em]">
                {selectedShipping ? selectedShipping.label : 'Choose Shipping Type'}
              </span>
              {selectedShipping && (
                <span className="mt-0.5 block truncate text-[13px] font-medium text-subtle">
                  {selectedShipping.arrival}
                </span>
              )}
            </span>
            {selectedShipping && (
              <span className="shrink-0 text-[15px] font-bold tracking-[-0.01em]">
                {formatPrice(selectedShipping.price)}
              </span>
            )}
            <EditIcon className="h-5 w-5 shrink-0 text-ink" />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-[18px] font-bold tracking-[-0.01em]">Promo Code</h2>
          <div className="mt-3.5 flex items-center gap-3">
            {promoApplied ? (
              <div className="flex h-14 min-w-0 flex-1 items-center justify-between gap-3 rounded-full bg-ink px-5 text-white">
                <span className="truncate text-[15px] font-semibold">Discount 30% Off</span>
                <button
                  type="button"
                  onClick={clearPromo}
                  aria-label="Remove promo"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-opacity duration-200 active:opacity-70"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <input
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applyPromo()
                }}
                placeholder="Enter Promo Code"
                className="h-14 min-w-0 flex-1 rounded-full bg-surface px-5 text-[15px] font-medium text-ink outline-none placeholder:text-subtle"
              />
            )}
            <button
              type="button"
              onClick={applyPromo}
              aria-label="Add promo code"
              disabled={promoApplied}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-200 active:scale-95 disabled:opacity-40"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 mb-4 space-y-3.5 rounded-[28px] bg-[#f5f5f5] px-5 py-5 text-[15px] font-semibold">
          <div className="flex items-center justify-between">
            <span className="text-subtle">Amount</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-subtle">Shipping</span>
            <span>{selectedShipping ? formatPrice(selectedShipping.price) : '-'}</span>
          </div>
          {promoApplied && (
            <div className="flex items-center justify-between">
              <span className="text-subtle">Promo</span>
              <span>- {formatPrice(discount)}</span>
            </div>
          )}
          <div className="border-t border-ink/10 pt-3.5">
            <div className="flex items-center justify-between text-[16px] font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-white via-white to-transparent px-5 pt-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={cart.length === 0 || !selectedShipping}
          onClick={() => placeOrder(promoApplied)}
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-4 text-[16px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] transition-opacity duration-200 active:opacity-80 disabled:opacity-40"
        >
          Continue to Payment
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}
