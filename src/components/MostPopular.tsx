import { motion } from 'motion/react'
import { filterProducts, popularFilters, products } from '../data/catalog'
import { useShop } from '../store/shop'
import { ProductCard } from './ProductCard'
import { SectionHeader } from './SectionHeader'

export function MostPopular() {
  const { query, filters, applyFilters, openFilter } = useShop()
  const visible = filterProducts(products, filters, query)

  return (
    <section className="mt-7">
      <SectionHeader title="Most Popular" actionLabel="Filter" onAction={openFilter} />

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-6 pb-1">
        {popularFilters.map((option) => {
          const isActive = option === filters.category

          return (
            <button
              key={option}
              type="button"
              onClick={() => applyFilters({ ...filters, category: option })}
              className={`shrink-0 rounded-full border px-6 py-2.5 text-[15px] font-semibold transition-colors duration-300 ${
                isActive ? 'border-ink bg-ink text-white' : 'border-ink bg-white text-ink'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 px-6">
          {visible.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(index, 4) * 0.05, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-8 px-6 text-center text-[14px] font-medium text-subtle">
          No pairs match those filters yet.
        </p>
      )}
    </section>
  )
}
