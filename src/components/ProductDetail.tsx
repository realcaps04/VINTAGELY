import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { formatPrice, formatSold } from '../data/catalog'
import { useShop } from '../store/shop'
import {
  BackIcon,
  BagIcon,
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from './Icons'

export function ProductDetail() {
  const { selectedProduct, closeProduct, isWishlisted, toggleWishlist, addToCart } = useShop()

  if (!selectedProduct) return null

  return (
    <ProductDetailView
      key={selectedProduct.id}
      productId={selectedProduct.id}
      onBack={closeProduct}
      wishlisted={isWishlisted(selectedProduct.id)}
      onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
      onAddToCart={addToCart}
    />
  )
}

function ProductDetailView({
  productId,
  onBack,
  wishlisted,
  onToggleWishlist,
  onAddToCart,
}: {
  productId: string
  onBack: () => void
  wishlisted: boolean
  onToggleWishlist: () => void
  onAddToCart: (item: {
    productId: string
    size: number
    color: string
    quantity: number
  }) => void
}) {
  const { selectedProduct } = useShop()
  const product = selectedProduct!
  const gallery = product.images.length > 0 ? product.images : [product.image]

  const trackRef = useRef<HTMLDivElement>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const [addedFlash, setAddedFlash] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [productId])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setImageIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  const handleAdd = () => {
    onAddToCart({ productId: product.id, size, color, quantity })
    setAddedFlash(true)
    window.setTimeout(() => setAddedFlash(false), 1200)
  }

  const description = expanded
    ? `${product.description} Crafted for everyday wear with a cushioned midsole and durable upper that holds its shape wash after wash.`
    : product.description

  return (
    <motion.div
      className="relative min-h-dvh bg-white pb-28"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.22 }}
    >
      <div className="relative bg-white pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="absolute left-4 top-[max(1rem,calc(env(safe-area-inset-top)+0.35rem))] z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-200 active:scale-90"
        >
          <BackIcon />
        </button>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {gallery.map((src, index) => (
            <div key={`${src}-${index}`} className="w-full shrink-0 snap-start px-6 pb-2 pt-12">
              <img
                src={src}
                alt={`${product.name} view ${index + 1}`}
                className="mx-auto h-[280px] w-full max-w-[320px] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 pb-5">
          {gallery.map((_, index) => {
            const isActive = index === imageIndex
            return (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-5 bg-ink/70' : 'w-1.5 bg-ink/20'
                }`}
              />
            )
          })}
        </div>
      </div>

      <div className="px-6 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="min-w-0 flex-1 text-[26px] font-bold leading-tight tracking-[-0.03em]">
            {product.name}
          </h1>
          <button
            type="button"
            onClick={onToggleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={`mt-1 shrink-0 p-1 transition-transform duration-200 active:scale-90 ${
              wishlisted ? 'text-offer-500' : 'text-ink'
            }`}
          >
            <HeartIcon className="h-7 w-7" strokeWidth={1.7} filled={wishlisted} />
          </button>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-surface px-3.5 py-1.5 text-[13px] font-semibold text-ink">
            {formatSold(product.sold)} sold
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <StarIcon className="h-3.5 w-3.5" />
            {product.rating.toFixed(1)} ({formatSold(product.reviews)} reviews)
          </span>
        </div>

        <div className="mt-5 border-t border-hairline pt-5">
          <h2 className="text-[17px] font-bold tracking-[-0.01em]">Description</h2>
          <p className="mt-2 text-[14px] font-medium leading-relaxed text-subtle">
            {description}{' '}
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="inline font-bold text-ink"
            >
              {expanded ? 'view less..' : 'view more..'}
            </button>
          </p>
        </div>

        <div className="no-scrollbar mt-6 flex gap-8 overflow-x-auto pb-1">
          <div className="shrink-0">
            <h2 className="text-[17px] font-bold tracking-[-0.01em]">Size</h2>
            <div className="mt-3.5 flex gap-3">
              {product.sizes.map((option) => {
                const isActive = option === size
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border text-[15px] font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'border-ink bg-ink text-white'
                        : 'border-hairline bg-white text-subtle'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="shrink-0">
            <h2 className="text-[17px] font-bold tracking-[-0.01em]">Color</h2>
            <div className="mt-3.5 flex items-center gap-3">
              {product.colors.map((swatch) => {
                const isActive = swatch === color
                return (
                  <button
                    key={swatch}
                    type="button"
                    onClick={() => setColor(swatch)}
                    aria-label={`Color ${swatch}`}
                    aria-pressed={isActive}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-200 active:scale-90"
                    style={{ backgroundColor: swatch }}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 mb-2 flex items-center justify-between">
          <h2 className="text-[17px] font-bold tracking-[-0.01em]">Quantity</h2>
          <div className="flex h-11 items-center gap-5 rounded-full bg-surface px-4">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-7 w-7 place-items-center text-ink transition-opacity disabled:opacity-30"
            >
              <MinusIcon />
            </button>
            <span className="min-w-4 text-center text-[15px] font-bold tabular-nums">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(20, value + 1))}
              className="grid h-7 w-7 place-items-center text-ink"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-hairline bg-white px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-subtle">Total price</p>
            <p className="mt-0.5 text-[24px] font-bold tracking-[-0.03em]">
              {formatPrice(product.price * quantity)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="ml-auto flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] transition-transform duration-200 active:scale-[0.98]"
          >
            <BagIcon className="h-5 w-5" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={addedFlash ? 'added' : 'add'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {addedFlash ? 'Added' : 'Add to Cart'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
