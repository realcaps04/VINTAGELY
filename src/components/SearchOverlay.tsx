import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Brand } from '../data/catalog'
import { formatPrice, searchBrands, searchProducts, stockedBrands } from '../data/catalog'
import { useShop } from '../store/shop'
import { BrandMark } from './BrandMark'
import { CloseIcon, SearchIcon } from './Icons'

/**
 * Full-screen search sheet. While it is open the home screen behind it is made
 * `inert` by the app shell, so the opaque panel is the only thing that can be
 * touched and stray taps can't fire actions underneath.
 */
export function SearchOverlay() {
  const { isSearchOpen } = useShop()

  return <AnimatePresence>{isSearchOpen && <SearchPanel />}</AnimatePresence>
}

function SearchPanel() {
  const { query, closeSearch, commitSearch } = useShop()
  // Mounted fresh on every open, so the committed query seeds the draft here.
  const [draft, setDraft] = useState(query)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSearch()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [closeSearch])

  const term = draft.trim()
  const brandMatches = searchBrands(term)
  const productMatches = searchProducts(term)
  const hasMatches = brandMatches.length > 0 || productMatches.length > 0

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (term) commitSearch(term)
    else closeSearch()
  }

  return (
    <motion.div
      className="fixed inset-0 z-90 flex justify-center bg-ink/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={closeSearch}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="flex h-full w-full max-w-[430px] flex-col bg-white"
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        onClick={(event) => event.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 px-6 pb-3 pt-[max(1rem,env(safe-area-inset-top))]"
        >
          <div className="flex h-14 min-w-0 flex-1 items-center gap-3.5 rounded-3xl bg-surface px-5">
            <SearchIcon className="h-5 w-5 shrink-0 text-subtle" />
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              type="search"
              placeholder="Search"
              autoComplete="off"
              enterKeyHint="search"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-[16px] font-normal tracking-[-0.01em] text-ink outline-none [&::-webkit-search-cancel-button]:hidden placeholder:text-subtle"
            />
            {draft.length > 0 && (
              <button
                type="button"
                onClick={() => setDraft('')}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1 text-subtle transition-transform duration-200 active:scale-90"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={closeSearch}
            className="shrink-0 text-[15px] font-semibold text-ink transition-opacity duration-200 active:opacity-60"
          >
            Cancel
          </button>
        </form>

        <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {!term && (
            <Suggestions title="Popular searches" brands={stockedBrands} onPick={commitSearch} />
          )}

          {term && !hasMatches && (
            <div className="pt-10 text-center">
              <p className="text-[15px] font-semibold text-ink">
                Nothing in store matches “{term}”
              </p>
              <p className="mt-1.5 text-[13.5px] text-subtle">Try one of the brands we carry.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {stockedBrands.map((brand) => (
                  <BrandChip key={brand.id} brand={brand} onPick={commitSearch} />
                ))}
              </div>
            </div>
          )}

          {term && hasMatches && (
            <>
              {brandMatches.length > 0 && (
                <Suggestions title="Brands" brands={brandMatches} onPick={commitSearch} />
              )}

              {productMatches.length > 0 && (
                <section className="pt-5">
                  <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-subtle">
                    Products
                  </h2>
                  <ul className="mt-1">
                    {productMatches.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => commitSearch(product.name)}
                          className="flex w-full items-center gap-3.5 py-3 text-left transition-opacity duration-200 active:opacity-60"
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-2xl bg-surface object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold text-ink">
                              {product.name}
                            </span>
                            <span className="block text-[13px] font-medium text-subtle">
                              {product.brand}
                            </span>
                          </span>
                          <span className="shrink-0 text-[14px] font-bold text-ink">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Suggestions({
  title,
  brands,
  onPick,
}: {
  title: string
  brands: Brand[]
  onPick: (term: string) => void
}) {
  return (
    <section className="pt-5">
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-subtle">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {brands.map((brand) => (
          <BrandChip key={brand.id} brand={brand} onPick={onPick} />
        ))}
      </div>
    </section>
  )
}

function BrandChip({ brand, onPick }: { brand: Brand; onPick: (term: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(brand.name)}
      className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-[14px] font-semibold text-ink transition-transform duration-200 active:scale-95"
    >
      {brand.icon && <BrandMark icon={brand.icon} className="h-4 w-4" />}
      {brand.name}
    </button>
  )
}
