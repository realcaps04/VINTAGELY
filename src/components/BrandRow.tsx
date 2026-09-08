import { brands } from '../data/catalog'
import { useShop } from '../store/shop'
import { BrandMark } from './BrandMark'

export function BrandRow() {
  const { filters, applyFilters } = useShop()

  return (
    <nav className="mt-6 grid grid-cols-4 gap-x-3 gap-y-5 px-6" aria-label="Shop by brand">
      {brands.map((brand) => {
        const isActive = filters.category === brand.name

        return (
          <button
            key={brand.id}
            type="button"
            onClick={() =>
              applyFilters({
                ...filters,
                category: brand.name === 'More' ? 'All' : brand.name,
              })
            }
            className="flex flex-col items-center gap-2"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 active:scale-95 ${
                isActive ? 'bg-ink text-white' : 'bg-surface text-ink'
              }`}
            >
              {brand.icon ? (
                <BrandMark icon={brand.icon} className="h-7 w-7" />
              ) : (
                <span className="text-[19px] font-extrabold leading-none tracking-[-0.05em]">
                  ···
                </span>
              )}
            </span>
            <span className="w-full truncate text-center text-[14px] font-medium">
              {brand.name}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
