import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { products, formatPrice } from '../data/catalog'
import { useShop, type CartLine } from '../store/shop'
import { ArrowRightIcon, MinusIcon, PlusIcon, SearchIcon, TrashIcon } from './Icons'

export function CartScreen() {
  const {
    cart,
    cartTotal,
    openSearch,
    openProduct,
    openCheckout,
    updateCartQuantity,
    removeFromCart,
  } = useShop()
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null)

  const pendingLine = cart.find((line) => line.id === pendingRemoveId) ?? null

  return (
    <div className="relative min-h-dvh bg-[#f7f7f7] pb-44">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center bg-white px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <img
          src="/logo_main.png"
          alt="Vintagely"
          className="h-10 w-10 justify-self-start rounded-full object-cover"
        />
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">My Cart</h1>
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search"
          className="justify-self-end p-1 text-ink transition-transform duration-200 active:scale-90"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </header>

      {cart.length === 0 ? (
        <div className="px-6 pt-20 text-center">
          <p className="text-[18px] font-bold tracking-[-0.02em]">Your cart is empty</p>
          <p className="mt-2 text-[14px] font-medium text-subtle">
            Add a pair from the shop and it will show up here.
          </p>
        </div>
      ) : (
        <ul className="space-y-4 px-5 pt-2">
          {cart.map((line) => {
            const product = products.find((entry) => entry.id === line.productId)
            if (!product) return null

            return (
              <li key={line.id}>
                <CartItemCard
                  line={line}
                  productName={product.name}
                  productImage={product.image}
                  price={product.price}
                  onOpen={() => openProduct(product.id)}
                  onRemove={() => setPendingRemoveId(line.id)}
                  onQuantity={(quantity) => updateCartQuantity(line.id, quantity)}
                />
              </li>
            )
          })}
        </ul>
      )}

      <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-3 pb-[5.75rem]">
        <div className="pointer-events-auto flex items-center gap-3 rounded-[32px] bg-white px-5 py-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.22)]">
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-subtle">Total price</p>
            <p className="mt-0.5 text-[24px] font-bold tracking-[-0.03em]">
              {formatPrice(cartTotal)}
            </p>
          </div>

          <button
            type="button"
            disabled={cart.length === 0}
            onClick={openCheckout}
            className="ml-auto flex items-center gap-2.5 rounded-full bg-ink py-3.5 pr-3.5 pl-6 text-[15px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)] transition-opacity duration-200 active:opacity-80 disabled:opacity-40"
          >
            Checkout
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {pendingLine && (
          <RemoveConfirmSheet
            line={pendingLine}
            onCancel={() => setPendingRemoveId(null)}
            onConfirm={() => {
              removeFromCart(pendingLine.id)
              setPendingRemoveId(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function CartItemCard({
  line,
  productName,
  productImage,
  price,
  onOpen,
  onRemove,
  onQuantity,
  quantityDisabled = false,
}: {
  line: CartLine
  productName: string
  productImage: string
  price: number
  onOpen?: () => void
  onRemove?: () => void
  onQuantity?: (quantity: number) => void
  quantityDisabled?: boolean
}) {
  return (
    <div className="flex gap-3.5 rounded-[28px] bg-white p-3.5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)]">
      <button
        type="button"
        onClick={onOpen}
        disabled={!onOpen}
        className="grid h-[104px] w-[104px] shrink-0 place-items-center overflow-hidden rounded-[22px] bg-white disabled:pointer-events-none"
      >
        <img src={productImage} alt="" className="h-full w-full object-cover" />
      </button>

      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={onOpen}
            disabled={!onOpen}
            className="min-w-0 text-left disabled:pointer-events-none"
          >
            <h2 className="truncate text-[16px] font-bold tracking-[-0.01em]">{productName}</h2>
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${productName}`}
              className="shrink-0 p-0.5 text-ink transition-transform duration-200 active:scale-90"
            >
              <TrashIcon className="h-[18px] w-[18px]" />
            </button>
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-subtle">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: line.color }}
            aria-hidden
          />
          <span className="truncate">
            {line.colorLabel} | Size = {line.size}
          </span>
        </div>

        <div className="mt-3.5 flex items-end justify-between gap-2">
          <p className="text-[17px] font-bold tracking-[-0.02em]">{formatPrice(price)}</p>

          <div
            className={`flex h-9 items-center gap-3.5 rounded-full bg-surface px-3 ${
              quantityDisabled ? 'pointer-events-none opacity-70' : ''
            }`}
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantityDisabled}
              onClick={() => onQuantity?.(line.quantity - 1)}
              className="grid h-6 w-6 place-items-center text-ink"
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-3 text-center text-[13px] font-bold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantityDisabled}
              onClick={() => onQuantity?.(line.quantity + 1)}
              className="grid h-6 w-6 place-items-center text-ink"
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RemoveConfirmSheet({
  line,
  onCancel,
  onConfirm,
}: {
  line: CartLine
  onCancel: () => void
  onConfirm: () => void
}) {
  const titleId = useId()
  const product = products.find((entry) => entry.id === line.productId)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onCancel])

  if (!product) return null

  return (
    <motion.div
      className="fixed inset-0 z-90 flex items-end justify-center bg-ink/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
    >
      <motion.div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[430px] rounded-t-[36px] bg-white px-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.2)]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <span className="h-1 w-10 rounded-full bg-hairline" />
          <h2 id={titleId} className="mt-4 text-[22px] font-bold tracking-[-0.02em]">
            Remove From Cart?
          </h2>
        </div>

        <div className="mt-4 border-t border-hairline pt-5">
          <CartItemCard
            line={line}
            productName={product.name}
            productImage={product.image}
            price={product.price}
            quantityDisabled
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-[28px] bg-surface py-4 text-[16px] font-bold text-ink transition-opacity duration-200 active:opacity-70"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-[28px] bg-ink py-4 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)] transition-opacity duration-200 active:opacity-80"
          >
            Yes, Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
