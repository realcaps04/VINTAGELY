import { motion } from 'motion/react'
import { popularFilters, products } from '../data/catalog'
import { useShop } from '../store/shop'
import { ProductCard } from './ProductCard'
import { SectionHeader } from './SectionHeader'

export function MostPopular({
  filter,
  onFilterChange,
}: {
  filter: string
  onFilterChange: (value: string) => void
}) {
  const { query } = useShop()
  const term = query.trim().toLowerCase()

  const visible = products.filter((product) => {
    const matchesBrand = filter === 'All' || product.brand === filter
    const matchesQuery =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    return matchesBrand && matchesQuery
  })

  return (
    <section className="mt-7">
      <SectionHeader title="Most Popular" />

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto px-6 pb-1">
        {popularFilters.map((option) => {
          const isActive = option === filter

          return (
            <button
              key={option}
              type="button"
              onClick={() => onFilterChange(option)}
              className={`shrink-0 rounded-full border px-6 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
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
          No pairs match that search yet.
        </p>
      )}
    </section>
  )
}
